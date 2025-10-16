// src/models/RefreshToken.js
const fs = require("fs");
const path = require("path");

class RefreshToken {
  constructor() {
  this.filePath = path.join(__dirname, "..", "data", "refreshTokens.json");
    this.initializeTokenFile();
  }

  initializeTokenFile() {
    // Create token file if not exists
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
    }
  }

  saveToken(userId, token) {
    // Save refresh token for user
    const tokens = this.getAllTokens().filter((t) => t.userId !== userId);
    tokens.push({ userId, token, createdAt: new Date().toISOString() });
    fs.writeFileSync(this.filePath, JSON.stringify(tokens, null, 2));
  }

  removeToken(token) {
    // Remove refresh token
    const tokens = this.getAllTokens().filter((t) => t.token !== token);
    fs.writeFileSync(this.filePath, JSON.stringify(tokens, null, 2));
  }

  findToken(token) {
    // Find refresh token
    return this.getAllTokens().find((t) => t.token === token);
  }

  getAllTokens() {
    // Get all refresh tokens
    try {
      return JSON.parse(fs.readFileSync(this.filePath, "utf8"));
    } catch {
      return [];
    }
  }
}

module.exports = new RefreshToken();