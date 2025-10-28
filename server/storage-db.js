"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.storage = exports.DatabaseStorage = void 0;
var db_1 = require("./db");
var drizzle_orm_1 = require("drizzle-orm");
var schema_1 = require("@shared/schema");
var DatabaseStorage = /** @class */ (function () {
    function DatabaseStorage() {
    }
    // Users
    DatabaseStorage.prototype.getUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id))];
                    case 1:
                        user = (_a.sent())[0];
                        return [2 /*return*/, user || undefined];
                }
            });
        });
    };
    DatabaseStorage.prototype.upsertUser = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .insert(schema_1.users)
                            .values(userData)
                            .onConflictDoUpdate({
                            target: schema_1.users.id,
                            set: __assign(__assign({}, userData), { updatedAt: new Date() }),
                        })
                            .returning()];
                    case 1:
                        user = (_a.sent())[0];
                        return [2 /*return*/, user];
                }
            });
        });
    };
    DatabaseStorage.prototype.updateUser = function (id, userData) {
        return __awaiter(this, void 0, void 0, function () {
            var updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .update(schema_1.users)
                            .set(__assign(__assign({}, userData), { updatedAt: new Date() }))
                            .where((0, drizzle_orm_1.eq)(schema_1.users.id, id))
                            .returning()];
                    case 1:
                        updated = (_a.sent())[0];
                        return [2 /*return*/, updated || undefined];
                }
            });
        });
    };
    DatabaseStorage.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.delete(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id))];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.rowCount !== null && result.rowCount > 0];
                }
            });
        });
    };
    // Speakers
    DatabaseStorage.prototype.getSpeakers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.select().from(schema_1.speakers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseStorage.prototype.getSpeaker = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var speaker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.select().from(schema_1.speakers).where((0, drizzle_orm_1.eq)(schema_1.speakers.id, id))];
                    case 1:
                        speaker = (_a.sent())[0];
                        return [2 /*return*/, speaker || undefined];
                }
            });
        });
    };
    DatabaseStorage.prototype.createSpeaker = function (speaker) {
        return __awaiter(this, void 0, void 0, function () {
            var newSpeaker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.insert(schema_1.speakers).values(speaker).returning()];
                    case 1:
                        newSpeaker = (_a.sent())[0];
                        return [2 /*return*/, newSpeaker];
                }
            });
        });
    };
    DatabaseStorage.prototype.updateSpeaker = function (id, speaker) {
        return __awaiter(this, void 0, void 0, function () {
            var updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.update(schema_1.speakers).set(speaker).where((0, drizzle_orm_1.eq)(schema_1.speakers.id, id)).returning()];
                    case 1:
                        updated = (_a.sent())[0];
                        return [2 /*return*/, updated || undefined];
                }
            });
        });
    };
    DatabaseStorage.prototype.deleteSpeaker = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.delete(schema_1.speakers).where((0, drizzle_orm_1.eq)(schema_1.speakers.id, id))];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.rowCount !== null && result.rowCount > 0];
                }
            });
        });
    };
    // Categories
    DatabaseStorage.prototype.getCategories = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.select().from(schema_1.categories)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseStorage.prototype.getCategory = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var category;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.select().from(schema_1.categories).where((0, drizzle_orm_1.eq)(schema_1.categories.id, id))];
                    case 1:
                        category = (_a.sent())[0];
                        return [2 /*return*/, category || undefined];
                }
            });
        });
    };
    DatabaseStorage.prototype.createCategory = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            var newCategory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.insert(schema_1.categories).values(category).returning()];
                    case 1:
                        newCategory = (_a.sent())[0];
                        return [2 /*return*/, newCategory];
                }
            });
        });
    };
    DatabaseStorage.prototype.updateCategory = function (id, category) {
        return __awaiter(this, void 0, void 0, function () {
            var updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.update(schema_1.categories).set(category).where((0, drizzle_orm_1.eq)(schema_1.categories.id, id)).returning()];
                    case 1:
                        updated = (_a.sent())[0];
                        return [2 /*return*/, updated || undefined];
                }
            });
        });
    };
    DatabaseStorage.prototype.deleteCategory = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.delete(schema_1.categories).where((0, drizzle_orm_1.eq)(schema_1.categories.id, id))];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.rowCount !== null && result.rowCount > 0];
                }
            });
        });
    };
    // Speeches
    DatabaseStorage.prototype.getSpeeches = function (filters) {
        return __awaiter(this, void 0, void 0, function () {
            var query, conditions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.db
                            .select({
                            id: schema_1.speeches.id,
                            title: schema_1.speeches.title,
                            speakerId: schema_1.speeches.speakerId,
                            categoryId: schema_1.speeches.categoryId,
                            type: schema_1.speeches.type,
                            date: schema_1.speeches.date,
                            location: schema_1.speeches.location,
                            context: schema_1.speeches.context,
                            transcript: schema_1.speeches.transcript,
                            audioUrl: schema_1.speeches.audioUrl,
                            duration: schema_1.speeches.duration,
                            excerpt: schema_1.speeches.excerpt,
                            imageUrl: schema_1.speeches.imageUrl,
                            speaker: schema_1.speakers,
                            category: schema_1.categories,
                        })
                            .from(schema_1.speeches)
                            .innerJoin(schema_1.speakers, (0, drizzle_orm_1.eq)(schema_1.speeches.speakerId, schema_1.speakers.id))
                            .innerJoin(schema_1.categories, (0, drizzle_orm_1.eq)(schema_1.speeches.categoryId, schema_1.categories.id));
                        conditions = [];
                        if (filters === null || filters === void 0 ? void 0 : filters.categoryId) {
                            conditions.push((0, drizzle_orm_1.eq)(schema_1.speeches.categoryId, filters.categoryId));
                        }
                        if (filters === null || filters === void 0 ? void 0 : filters.speakerId) {
                            conditions.push((0, drizzle_orm_1.eq)(schema_1.speeches.speakerId, filters.speakerId));
                        }
                        if (filters === null || filters === void 0 ? void 0 : filters.type) {
                            conditions.push((0, drizzle_orm_1.eq)(schema_1.speeches.type, filters.type));
                        }
                        if (filters === null || filters === void 0 ? void 0 : filters.search) {
                            conditions.push((0, drizzle_orm_1.or)((0, drizzle_orm_1.like)(schema_1.speeches.title, "%".concat(filters.search, "%")), (0, drizzle_orm_1.like)(schema_1.speeches.excerpt, "%".concat(filters.search, "%")), (0, drizzle_orm_1.like)(schema_1.speakers.name, "%".concat(filters.search, "%"))));
                        }
                        if (conditions.length > 0) {
                            query = query.where(drizzle_orm_1.and.apply(void 0, conditions));
                        }
                        return [4 /*yield*/, query];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseStorage.prototype.getSpeech = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var speech;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .select({
                            id: schema_1.speeches.id,
                            title: schema_1.speeches.title,
                            speakerId: schema_1.speeches.speakerId,
                            categoryId: schema_1.speeches.categoryId,
                            type: schema_1.speeches.type,
                            date: schema_1.speeches.date,
                            location: schema_1.speeches.location,
                            context: schema_1.speeches.context,
                            transcript: schema_1.speeches.transcript,
                            audioUrl: schema_1.speeches.audioUrl,
                            duration: schema_1.speeches.duration,
                            excerpt: schema_1.speeches.excerpt,
                            imageUrl: schema_1.speeches.imageUrl,
                            speaker: schema_1.speakers,
                            category: schema_1.categories,
                        })
                            .from(schema_1.speeches)
                            .innerJoin(schema_1.speakers, (0, drizzle_orm_1.eq)(schema_1.speeches.speakerId, schema_1.speakers.id))
                            .innerJoin(schema_1.categories, (0, drizzle_orm_1.eq)(schema_1.speeches.categoryId, schema_1.categories.id))
                            .where((0, drizzle_orm_1.eq)(schema_1.speeches.id, id))];
                    case 1:
                        speech = (_a.sent())[0];
                        return [2 /*return*/, speech || undefined];
                }
            });
        });
    };
    DatabaseStorage.prototype.createSpeech = function (speech) {
        return __awaiter(this, void 0, void 0, function () {
            var newSpeech;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.insert(schema_1.speeches).values(speech).returning()];
                    case 1:
                        newSpeech = (_a.sent())[0];
                        return [2 /*return*/, newSpeech];
                }
            });
        });
    };
    DatabaseStorage.prototype.updateSpeech = function (id, speech) {
        return __awaiter(this, void 0, void 0, function () {
            var updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.update(schema_1.speeches).set(speech).where((0, drizzle_orm_1.eq)(schema_1.speeches.id, id)).returning()];
                    case 1:
                        updated = (_a.sent())[0];
                        return [2 /*return*/, updated || undefined];
                }
            });
        });
    };
    DatabaseStorage.prototype.deleteSpeech = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.delete(schema_1.speeches).where((0, drizzle_orm_1.eq)(schema_1.speeches.id, id))];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.rowCount !== null && result.rowCount > 0];
                }
            });
        });
    };
    return DatabaseStorage;
}());
exports.DatabaseStorage = DatabaseStorage;
exports.storage = new DatabaseStorage();
