import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";


const servidormcp= new McpServer({
    name:"pokemon_mcp",
    version:"1"
});

servidormcp.registerTool("pokemon",
    {
    title:"get_pokemon",
    description:"obtiene informacion de pokemones",
    inputSchema:{pokemon: z.string().min(1,"Debes ingresar un poke")}
    },
async({pokemon})=>{
const url="https://appsgfx.com/pokedex/pokemons.json";
const data=await fetch(url);
const pokemons=await data.json();
const pokemonobj=pokemons.results.find(p=>p.name===pokemon);

return{
    content:[{
        type:"text",
        text:JSON.stringify(pokemonobj)
    }]
}
});

servidormcp.registerTool("pokemones",{
    title:"get_all_pokemon",
    description:"obtiene informacion de todos pokemones",
},async({pokemon})=>{
const url="https://appsgfx.com/pokedex/pokemons.json";
const data=await fetch(url);
const pokemons=await data.json();

return{
    content:[{
        type:"text",
        text:JSON.stringify(pokemons.results)
    }]
}
});



const tramsporte=new StdioServerTransport();
await servidormcp.connect(tramsporte);