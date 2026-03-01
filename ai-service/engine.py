import networkx as nx
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# We'll use a small model for the MVP to keep it fast
# all-MiniLM-L6-v2 is standard and relatively lightweight
try:
    model = SentenceTransformer('all-MiniLM-L6-v2')
except Exception as e:
    print("Warning: Could not load SentenceTransformer locally, using fallback mock.", e)
    model = None

class TransSkillEngine:
    def __init__(self):
        self.skill_graph = nx.Graph()
        self._initialize_graph()

    def _initialize_graph(self):
        # A mock predefined graph of skill transferabilities (edges = strength 0-1)
        # In a real app, this would be massive and dynamic based on job market data
        edges = [
            ("Python", "Machine Learning", 0.9),
            ("Python", "Data Analysis", 0.8),
            ("Python", "Backend Development", 0.8),
            ("SQL", "Data Analysis", 0.9),
            ("JavaScript", "React", 0.9),
            ("JavaScript", "Node.js", 0.8),
            ("React", "Next.js", 0.9),
            ("HTML/CSS", "React", 0.7),
            ("Data Analysis", "Pandas", 0.9)
        ]
        self.skill_graph.add_weighted_edges_from(edges)

    def get_embeddings(self, texts):
        if model:
            return model.encode(texts)
        # Fallback random embeddings if model failed to load
        return np.random.rand(len(texts), 384)

    def predict_next_skills(self, current_skills: list[str], target_role: str, all_role_skills: list[str]) -> tuple[list[dict], dict]:
        """
        Predict the best next skills to learn.
        1. Find gap skills (skills in target role that user doesn't have)
        2. Calculate semantic similarity between current skills and gap skills
        3. Use Graph distance/transferability
        4. Score and rank
        """
        if not all_role_skills:
            return [], {"nodes": [], "links": []}

        # Skills the user doesn't have yet but are needed for the role
        gap_skills = [s for s in all_role_skills if s not in current_skills]
        
        if not gap_skills:
            return [], {"nodes": [], "links": []}

        # Calculate embeddings
        current_embeddings = self.get_embeddings(current_skills)
        gap_embeddings = self.get_embeddings(gap_skills)

        # Calculate max similarity for each gap skill against any current skill
        similarities = cosine_similarity(gap_embeddings, current_embeddings)
        max_sims = similarities.max(axis=1)

        recommendations = []
        nodes = []
        links = []

        # Add current skills to graph viz
        for s in current_skills:
            nodes.append({"id": s, "group": 1, "label": s})

        for idx, skill in enumerate(gap_skills):
            sim_score = float(max_sims[idx])
            
            # Find the most similar current skill to provide an explanation
            best_match_idx = similarities[idx].argmax()
            best_match_skill = current_skills[best_match_idx] if current_skills else "General Knowledge"

            # Check graph explicit transferability if exists
            graph_score = 0.5 # default moderate
            if self.skill_graph.has_node(best_match_skill) and self.skill_graph.has_node(skill):
                try:
                    path_len = nx.shortest_path_length(self.skill_graph, source=best_match_skill, target=skill, weight='weight')
                    graph_score = 1.0 / (1.0 + path_len)
                except nx.NetworkXNoPath:
                    graph_score = 0.2

            # Hybrid Score Output
            impact_score = (sim_score * 0.6) + (graph_score * 0.4)
            impact_score = round(impact_score * 10, 1) # out of 10

            reason = f"Highly transferable from your existing knowledge of {best_match_skill}."
            if impact_score < 4.0:
                reason = "Required for target role, though represents a new learning curve."

            # Tier 1, 2, 3 Mock Advanced Metrics based on impact score
            time_weeks = int(max(2, 12 - impact_score)) # Lower impact score = more time
            salary_boost = int(impact_score * 1500)     # E.g. 8.0 * 1500 = $12k

            recommendations.append({
                "skill": skill,
                "impact_score": impact_score,
                "transfer_score": round(graph_score * 10, 1), # Added for transparency
                "reason": reason,
                "transfer_from": best_match_skill,
                "time_to_roi": f"{time_weeks} to {time_weeks + 2} weeks",
                "salary_impact": salary_boost,
                "learning_resources": [
                    {"title": f"{skill} Masterclass", "provider": "Coursera", "duration": f"{time_weeks} weeks", "url": "#"},
                    {"title": f"Advanced {skill} Concepts", "provider": "Udemy", "duration": "10 hours", "url": "#"}
                ]
            })

            # Add to viz
            nodes.append({"id": skill, "group": 2, "label": skill})
            links.append({"source": best_match_skill, "target": skill, "value": impact_score})

        # Sort by impact score descending
        recommendations.sort(key=lambda x: x["impact_score"], reverse=True)
        
        # Take top 5
        top_recs = recommendations[:5]
        
        # Filter nodes and links to only include top recs
        top_skill_names = [r["skill"] for r in top_recs]
        filtered_nodes = [n for n in nodes if n["group"] == 1 or n["id"] in top_skill_names]
        filtered_links = [l for l in links if l["target"] in top_skill_names]

        return top_recs, {"nodes": filtered_nodes, "links": filtered_links}

engine = TransSkillEngine()
