"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var skillsData, skills, _i, skillsData_1, s, _a, _b, rolesData, roles, _c, rolesData_1, r, _d, _e, roleSkillMappings, _f, roleSkillMappings_1, mapping, roleId, _g, _h, skillName;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    console.log("Seeding database...");
                    // Clear existing
                    return [4 /*yield*/, prisma.roleSkill.deleteMany()];
                case 1:
                    // Clear existing
                    _j.sent();
                    return [4 /*yield*/, prisma.userSkill.deleteMany()];
                case 2:
                    _j.sent();
                    return [4 /*yield*/, prisma.jobRole.deleteMany()];
                case 3:
                    _j.sent();
                    return [4 /*yield*/, prisma.skill.deleteMany()];
                case 4:
                    _j.sent();
                    return [4 /*yield*/, prisma.userProfile.deleteMany()
                        // 1. Create Skills
                    ];
                case 5:
                    _j.sent();
                    skillsData = [
                        { name: "Python", category: "Programming" },
                        { name: "JavaScript", category: "Programming" },
                        { name: "TypeScript", category: "Programming" },
                        { name: "Java", category: "Programming" },
                        { name: "C++", category: "Programming" },
                        { name: "Go", category: "Programming" },
                        { name: "Ruby", category: "Programming" },
                        { name: "React", category: "Frontend" },
                        { name: "Next.js", category: "Frontend" },
                        { name: "HTML/CSS", category: "Frontend" },
                        { name: "Tailwind CSS", category: "Frontend" },
                        { name: "Node.js", category: "Backend" },
                        { name: "Express", category: "Backend" },
                        { name: "Django", category: "Backend" },
                        { name: "FastAPI", category: "Backend" },
                        { name: "SQL", category: "Database" },
                        { name: "PostgreSQL", category: "Database" },
                        { name: "MongoDB", category: "Database" },
                        { name: "Redis", category: "Database" },
                        { name: "Docker", category: "DevOps" },
                        { name: "Kubernetes", category: "DevOps" },
                        { name: "AWS", category: "DevOps" },
                        { name: "CI/CD", category: "DevOps" },
                        { name: "Machine Learning", category: "AI/Data" },
                        { name: "Deep Learning", category: "AI/Data" },
                        { name: "NLP", category: "AI/Data" },
                        { name: "Data Analysis", category: "AI/Data" },
                        { name: "Pandas", category: "AI/Data" },
                        { name: "PyTorch", category: "AI/Data" },
                        { name: "TensorFlow", category: "AI/Data" },
                        { name: "Figma", category: "Design" },
                        { name: "UI/UX Design", category: "Design" },
                        { name: "Agile", category: "Management" },
                        { name: "Git", category: "Tools" },
                        { name: "Linux", category: "OS" }
                    ];
                    skills = {};
                    _i = 0, skillsData_1 = skillsData;
                    _j.label = 6;
                case 6:
                    if (!(_i < skillsData_1.length)) return [3 /*break*/, 9];
                    s = skillsData_1[_i];
                    _a = skills;
                    _b = s.name;
                    return [4 /*yield*/, prisma.skill.create({ data: s })];
                case 7:
                    _a[_b] = _j.sent();
                    _j.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 6];
                case 9:
                    rolesData = [
                        { title: "Frontend Developer", description: "Builds user interfaces", demandScore: 8.5 },
                        { title: "Backend Developer", description: "Builds server-side logic and APIs", demandScore: 8.7 },
                        { title: "Full Stack Developer", description: "Handles both frontend and backend", demandScore: 9.2 },
                        { title: "Data Scientist", description: "Analyzes and models data", demandScore: 9.5 },
                        { title: "Machine Learning Engineer", description: "Builds scalable AI models", demandScore: 9.8 },
                        { title: "DevOps Engineer", description: "Manages infrastructure and deployments", demandScore: 9.0 },
                        { title: "UI/UX Designer", description: "Designs user experiences", demandScore: 8.0 },
                        { title: "Product Manager", description: "Manages product lifecycle", demandScore: 8.5 },
                        { title: "Data Analyst", description: "Extracts insights from data", demandScore: 8.2 },
                        { title: "Cloud Architect", description: "Designs cloud infrastructure", demandScore: 9.4 },
                        { title: "Cybersecurity Analyst", description: "Secures systems and networks", demandScore: 9.1 },
                        { title: "Mobile Developer", description: "Builds iOS and Android apps", demandScore: 8.3 },
                        { title: "Game Developer", description: "Builds interactive games", demandScore: 7.5 },
                        { title: "QA Engineer", description: "Ensures software quality", demandScore: 7.8 },
                        { title: "System Administrator", description: "Manages IT systems", demandScore: 7.0 }
                    ];
                    roles = {};
                    _c = 0, rolesData_1 = rolesData;
                    _j.label = 10;
                case 10:
                    if (!(_c < rolesData_1.length)) return [3 /*break*/, 13];
                    r = rolesData_1[_c];
                    _d = roles;
                    _e = r.title;
                    return [4 /*yield*/, prisma.jobRole.create({ data: r })];
                case 11:
                    _d[_e] = _j.sent();
                    _j.label = 12;
                case 12:
                    _c++;
                    return [3 /*break*/, 10];
                case 13:
                    roleSkillMappings = [
                        { role: "Frontend Developer", skills: ["HTML/CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Git"] },
                        { role: "Backend Developer", skills: ["Python", "Node.js", "SQL", "PostgreSQL", "Docker", "Git", "Go", "Java"] },
                        { role: "Full Stack Developer", skills: ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "Git", "Tailwind CSS"] },
                        { role: "Data Scientist", skills: ["Python", "Machine Learning", "Data Analysis", "Pandas", "SQL"] },
                        { role: "Machine Learning Engineer", skills: ["Python", "PyTorch", "TensorFlow", "Deep Learning", "Docker", "AWS", "SQL"] },
                        { role: "DevOps Engineer", skills: ["Linux", "Docker", "Kubernetes", "AWS", "CI/CD", "Python", "Git"] },
                        { role: "UI/UX Designer", skills: ["Figma", "UI/UX Design", "HTML/CSS"] },
                        { role: "Data Analyst", skills: ["Python", "Data Analysis", "SQL", "Pandas"] },
                        { role: "Cloud Architect", skills: ["AWS", "Linux", "Docker", "Kubernetes", "Python"] }
                    ];
                    _f = 0, roleSkillMappings_1 = roleSkillMappings;
                    _j.label = 14;
                case 14:
                    if (!(_f < roleSkillMappings_1.length)) return [3 /*break*/, 19];
                    mapping = roleSkillMappings_1[_f];
                    roleId = roles[mapping.role].id;
                    _g = 0, _h = mapping.skills;
                    _j.label = 15;
                case 15:
                    if (!(_g < _h.length)) return [3 /*break*/, 18];
                    skillName = _h[_g];
                    if (!skills[skillName]) return [3 /*break*/, 17];
                    return [4 /*yield*/, prisma.roleSkill.create({
                            data: {
                                roleId: roleId,
                                skillId: skills[skillName].id,
                                importance: Math.floor(Math.random() * 3) + 3 // 3, 4, or 5
                            }
                        })];
                case 16:
                    _j.sent();
                    _j.label = 17;
                case 17:
                    _g++;
                    return [3 /*break*/, 15];
                case 18:
                    _f++;
                    return [3 /*break*/, 14];
                case 19:
                    console.log("Database seeded successfully!");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
