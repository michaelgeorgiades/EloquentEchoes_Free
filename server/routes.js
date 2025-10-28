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
exports.registerRoutes = registerRoutes;
var http_1 = require("http");
var storage_db_1 = require("./storage-db");
var seed_1 = require("./seed");
var replitAuth_1 = require("./replitAuth");
function registerRoutes(app) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1, httpServer;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Setup authentication
                return [4 /*yield*/, (0, replitAuth_1.setupAuth)(app)];
                case 1:
                    // Setup authentication
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, (0, seed_1.seedDatabase)()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Failed to seed database:", error_1);
                    return [3 /*break*/, 5];
                case 5:
                    // Auth user endpoint
                    app.get('/api/auth/user', replitAuth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var userId, user, error_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    userId = req.user.claims.sub;
                                    return [4 /*yield*/, storage_db_1.storage.getUser(userId)];
                                case 1:
                                    user = _a.sent();
                                    res.json(user);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_2 = _a.sent();
                                    console.error("Error fetching user:", error_2);
                                    res.status(500).json({ message: "Failed to fetch user" });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    // Speakers API
                    app.get("/api/speakers", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var speakers, error_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, storage_db_1.storage.getSpeakers()];
                                case 1:
                                    speakers = _a.sent();
                                    res.json(speakers);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_3 = _a.sent();
                                    res.status(500).json({ error: "Failed to fetch speakers" });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.post("/api/speakers", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var speaker, error_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, storage_db_1.storage.createSpeaker(req.body)];
                                case 1:
                                    speaker = _a.sent();
                                    res.status(201).json(speaker);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_4 = _a.sent();
                                    res.status(500).json({ error: "Failed to create speaker" });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get("/api/speakers/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var speaker, error_5;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, storage_db_1.storage.getSpeaker(req.params.id)];
                                case 1:
                                    speaker = _a.sent();
                                    if (!speaker) {
                                        return [2 /*return*/, res.status(404).json({ error: "Speaker not found" })];
                                    }
                                    res.json(speaker);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_5 = _a.sent();
                                    res.status(500).json({ error: "Failed to fetch speaker" });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.put("/api/speakers/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var updated, error_6;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, storage_db_1.storage.updateSpeaker(req.params.id, req.body)];
                                case 1:
                                    updated = _a.sent();
                                    if (!updated) {
                                        return [2 /*return*/, res.status(404).json({ error: "Speaker not found" })];
                                    }
                                    res.json(updated);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_6 = _a.sent();
                                    res.status(500).json({ error: "Failed to update speaker" });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.delete("/api/speakers/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var deleted, error_7;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, storage_db_1.storage.deleteSpeaker(req.params.id)];
                                case 1:
                                    deleted = _a.sent();
                                    if (!deleted) {
                                        return [2 /*return*/, res.status(404).json({ error: "Speaker not found" })];
                                    }
                                    res.json({ success: true });
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_7 = _a.sent();
                                    res.status(500).json({ error: "Failed to delete speaker" });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    // Categories API
                    app.get("/api/categories", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var categories, error_8;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, storage_db_1.storage.getCategories()];
                                case 1:
                                    categories = _a.sent();
                                    res.json(categories);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_8 = _a.sent();
                                    res.status(500).json({ error: "Failed to fetch categories" });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.post("/api/categories", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var category, error_9;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, storage_db_1.storage.createCategory(req.body)];
                                case 1:
                                    category = _a.sent();
                                    res.status(201).json(category);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_9 = _a.sent();
                                    res.status(500).json({ error: "Failed to create category" });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get("/api/categories/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var category, error_10;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, storage_db_1.storage.getCategory(req.params.id)];
                                case 1:
                                    category = _a.sent();
                                    if (!category) {
                                        return [2 /*return*/, res.status(404).json({ error: "Category not found" })];
                                    }
                                    res.json(category);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_10 = _a.sent();
                                    res.status(500).json({ error: "Failed to fetch category" });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.put("/api/categories/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var updated, error_11;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, storage_db_1.storage.updateCategory(req.params.id, req.body)];
                                case 1:
                                    updated = _a.sent();
                                    if (!updated) {
                                        return [2 /*return*/, res.status(404).json({ error: "Category not found" })];
                                    }
                                    res.json(updated);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_11 = _a.sent();
                                    res.status(500).json({ error: "Failed to update category" });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.delete("/api/categories/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var deleted, error_12;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, storage_db_1.storage.deleteCategory(req.params.id)];
                                case 1:
                                    deleted = _a.sent();
                                    if (!deleted) {
                                        return [2 /*return*/, res.status(404).json({ error: "Category not found" })];
                                    }
                                    res.json({ success: true });
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_12 = _a.sent();
                                    res.status(500).json({ error: "Failed to delete category" });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    // Speeches API with filtering
                    app.get("/api/speeches", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var filters, speeches, error_13;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    filters = {
                                        categoryId: req.query.categoryId,
                                        speakerId: req.query.speakerId,
                                        type: req.query.type,
                                        search: req.query.search,
                                    };
                                    return [4 /*yield*/, storage_db_1.storage.getSpeeches(filters)];
                                case 1:
                                    speeches = _a.sent();
                                    res.json(speeches);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_13 = _a.sent();
                                    res.status(500).json({ error: "Failed to fetch speeches" });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.post("/api/speeches", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var speech, error_14;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, storage_db_1.storage.createSpeech(req.body)];
                                case 1:
                                    speech = _a.sent();
                                    res.status(201).json(speech);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_14 = _a.sent();
                                    res.status(500).json({ error: "Failed to create speech" });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get("/api/speeches/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var speech, error_15;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, storage_db_1.storage.getSpeech(req.params.id)];
                                case 1:
                                    speech = _a.sent();
                                    if (!speech) {
                                        return [2 /*return*/, res.status(404).json({ error: "Speech not found" })];
                                    }
                                    res.json(speech);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_15 = _a.sent();
                                    res.status(500).json({ error: "Failed to fetch speech" });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.put("/api/speeches/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var updated, error_16;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, storage_db_1.storage.updateSpeech(req.params.id, req.body)];
                                case 1:
                                    updated = _a.sent();
                                    if (!updated) {
                                        return [2 /*return*/, res.status(404).json({ error: "Speech not found" })];
                                    }
                                    res.json(updated);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_16 = _a.sent();
                                    res.status(500).json({ error: "Failed to update speech" });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.delete("/api/speeches/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var deleted, error_17;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, storage_db_1.storage.deleteSpeech(req.params.id)];
                                case 1:
                                    deleted = _a.sent();
                                    if (!deleted) {
                                        return [2 /*return*/, res.status(404).json({ error: "Speech not found" })];
                                    }
                                    res.json({ success: true });
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_17 = _a.sent();
                                    res.status(500).json({ error: "Failed to delete speech" });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    httpServer = (0, http_1.createServer)(app);
                    return [2 /*return*/, httpServer];
            }
        });
    });
}
