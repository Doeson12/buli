/**
 * Test Component - Created via MCP
 * This file demonstrates that MCP filesystem tools are working!
 */

interface TestMCPProps {
  message?: string
}

export function TestMCP({ message = "MCP is working! 🎉" }: TestMCPProps) {
  return (
    <div className="p-4 bg-brand-accent-teal/10 rounded-lg border border-brand-accent-teal/20">
      <h3 className="text-lg font-semibold mb-2">MCP Test Component</h3>
      <p className="text-brand-text-secondary">{message}</p>
      <p className="text-xs text-brand-text-secondary/50 mt-2">
        Created by Claude using MCP filesystem tools
      </p>
    </div>
  )
}
