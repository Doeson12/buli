# MCP Setup for Buli Website

This folder contains the Model Context Protocol (MCP) configuration for the Buli website project.

## 🚀 Quick Start

### 1. Varmista edellytykset

```bash
node -v       # Vähintään v18
npm -v        # Vähintään v9
```

### 2. Asenna MCP-tuki Cursoriin

Cursorin pitää olla vähintään versio 0.42 MCP-tuen vuoksi.

Tarkista versio: `Cursor → About Cursor`

Jos vanha versio, päivitä: `Settings → About → Check for Updates`

### 3. Konfiguroi Cursor käyttämään MCP:tä

1. Avaa Cursor Settings (⌘ + ,)
2. Etsi "Model Context Protocol" tai "MCP"
3. Lisää MCP server configuration:

**Vaihtoehto A: Cursor Settings UI**
- Mene: Settings → Features → Model Context Protocol
- Lisää uusi MCP server
- Nimi: `buli-website`
- Config path: `/Users/john/buli/website/mcp/nextjs.mcp.json`

**Vaihtoehto B: Manuaalinen konfiguraatio**

Avaa Cursor config file (~/.cursor/config.json tai vastaava) ja lisää:

```json
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
```

### 4. Käynnistä Cursor uudelleen

Sulje ja avaa Cursor uudelleen, jotta MCP-konfiguraatio latautuu.

### 5. Testaa toimivuus

Kysy Claude:lta Cursorissa:
- "What files are in this Next.js project?"
- "Show me the current styling approach"
- "What components do we have?"

Claude pitäisi nyt nähdä projektisi rakenne ja noudattaa määriteltyjä sääntöjä.

## 📋 Mitä MCP tekee?

MCP antaa Claude:lle pääsyn:

### Resources (Resurssit)
- 📁 Kaikki projektitiedostot (`app/`, `components/`, `lib/`, jne.)
- 📐 Projektin rakenne ja konfiguraatiot
- 🎨 Tyylitiedostot ja design tokenit

### Rules (Säännöt)
- ✅ Next.js 13 App Router -parhaat käytännöt
- 🎨 Tailwind CSS -tyylitys
- ✨ Framer Motion -animaatiot
- 🌐 Internationalization next-intl:llä
- 📱 Mobile-first responsive design
- ♿ Accessibility-standardit

### Tools (Työkalut)
- 🔧 Dev server käynnistys
- 🏗️ Build-komennot
- 🧹 Linting
- 🧪 Testing (Playwright + Vitest)
- 📦 Git-operaatiot

## 🎯 Hyödyt

1. **Kontekstin säilyminen**: Claude muistaa projektin rakenteen ja säännöt
2. **Paremmat ehdotukset**: Koodinäytteet seuraavat projektisi tyyliä
3. **Nopeus**: Ei tarvitse selittää projektia joka kerta
4. **Johdonmukaisuus**: Kaikki muutokset noudattavat samoja periaatteita

## 🛠️ Troubleshooting

### MCP ei käynnisty
```bash
# Tarkista että npx toimii
npx --version

# Asenna MCP filesystem server manuaalisesti
npm install -g @modelcontextprotocol/server-filesystem
```

### Cursor ei näe MCP:tä
- Tarkista että Cursor on versio >= 0.42
- Käynnistä Cursor uudelleen
- Tarkista config.json polku ja syntaksi

### Claude ei noudata sääntöjä
- Varmista että MCP on aktiivinen (katso Cursor status bar)
- Mainitse säännöt eksplisiittisesti: "Follow the MCP rules for this project"

## 📝 Päivittäminen

Jos muutat projektin rakennetta tai sääntöjä, muokkaa `nextjs.mcp.json` ja käynnistä Cursor uudelleen.

## 🔗 Lisätietoja

- [MCP Documentation](https://modelcontextprotocol.io)
- [Cursor MCP Guide](https://docs.cursor.com/context/model-context-protocol)








