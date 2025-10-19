#!/bin/bash

# Buli Website MCP Setup Script
# This script sets up Model Context Protocol for Cursor

echo "🚀 Setting up MCP for Buli Website..."
echo ""

# Check Node version
echo "📋 Checking prerequisites..."
NODE_VERSION=$(node -v 2>/dev/null)
if [ -z "$NODE_VERSION" ]; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi
echo "✅ Node.js: $NODE_VERSION"

# Check npm version
NPM_VERSION=$(npm -v 2>/dev/null)
if [ -z "$NPM_VERSION" ]; then
    echo "❌ npm is not installed."
    exit 1
fi
echo "✅ npm: $NPM_VERSION"

echo ""
echo "📦 Installing MCP filesystem server..."
npm install -g @modelcontextprotocol/server-filesystem

echo ""
echo "⚙️  Configuring Cursor..."

# Create .cursor directory if it doesn't exist
CURSOR_DIR="$HOME/.cursor"
mkdir -p "$CURSOR_DIR"

CONFIG_FILE="$CURSOR_DIR/mcp.json"

# Create or update MCP config
cat > "$CONFIG_FILE" << 'EOF'
{
  "mcpServers": {
    "buli-website": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/john/buli/website"
      ]
    }
  }
}
EOF

echo "✅ Created MCP config at: $CONFIG_FILE"
echo ""
echo "🎉 Setup complete!"
echo ""
echo "📌 Next steps:"
echo "1. Restart Cursor completely (Cmd+Q and reopen)"
echo "2. Open this project in Cursor"
echo "3. Test by asking Claude: 'What files are in this Next.js project?'"
echo ""
echo "💡 Tip: You should see a small MCP indicator in the Cursor status bar when it's active."
echo ""








