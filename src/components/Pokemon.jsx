import { useEffect } from "react";
import { useState } from "react";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=650";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);

      const data = await res.json();

      const apiLink = data.results.map(async (currentEle) => {
      const res = await fetch(currentEle.url);

        const data = await res.json();
        return data;
      });

      const detailedPokemonData = await Promise.all(apiLink);

      setPokemon(detailedPokemonData);
     
      setLoading(false);
      
      
      
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  if(loading) {
    return <div className={`w-full flex justify-center min-h-screen items-center`}>
        <p className={`text-2xl font-semibold`}>Loading...</p>
    </div>
  };

  if(error) {

    return <div className={`w-full flex justify-center`}>
        <p className={`text-2xl font-semibold`}>{error.message}</p>
    </div>

  }

  const filterDate = pokemon.filter((currPoke) => {
       return currPoke.name.toLowerCase().includes(inputValue);
  })

  
  

  return (
    <>

       <header className={`fixed top-0 bg-slate-300 z-50 w-full`}>
        <nav className={`p-4 flex flex-col gap-4 justify-center items-center`}>
        <h1 className={`text-3xl text-center font-semibold`}>Catch Pokemon</h1>

          <input value={inputValue} className={`bg-slate-50 xl:w-[20%] lg:w-[30%] md:w-[50%] w-[70%] py-1 pl-4 rounded-sm`}
           onChange={(e) => setInputValue(e.target.value.toLowerCase())}
           type="text" placeholder="Search your cartoon here..." />

        </nav>


       </header>
    
    <section className={`md:max-w-[85%] max-w-[98%] mx-auto p-6`}>
   

      <div className={`pt-[100px]`}>
        <ul className={`flex flex-col md:flex-row gap-6 flex-wrap justify-between items-center mt-5`}>
            {filterDate.map((currentPoke) => {
                return <li key={currentPoke.id}>
                    <div id="pokemon-card" className={`group w-[270px] h-[350px] bg-white relative p-4 rounded-md flex flex-col justify-center cursor-pointer`}>
                        <div className={`flex justify-center w-full items-start h-[50%]`}>
                        <img className={`w-[30%] duration-300 relative group-hover:scale-105`} src={currentPoke.sprites.other.dream_world.front_default} alt={currentPoke.name} />
                        </div>

                        

                        <div className={`relative z-10 h-full pt-4`}>
                        <h1 className={`text-center capitalize text-2xl font-semibold`}>{currentPoke.name}</h1>
                        <p className={`text-center bg-green-500 text-white w-fit mx-auto mt-2 py-[2px] px-4 rounded-full capitalize`}>
                        {
                            
                            currentPoke.types.map((currentType) => currentType.type.name).join(", ")    
                           
                        }
                        </p>

                         
                         <div className={`flex justify-between mt-4`}>
                            <p className={`font-semibold text-[14px]`}>Height: <span className="font-normal">{currentPoke.height}</span></p>
                            <p className={`font-semibold text-[14px]`}>Weight: <span className="font-normal">{currentPoke.weight}</span></p>
                            <p className={`font-semibold text-[14px]`}>Speed: <span className="font-normal">{currentPoke.weight}</span></p>
                         </div>
                         
                         <div className={`flex flex-col justify-start items-center mt-4`}>
                            <p className={`font-semibold text-[14px]`}>Experience: <span className="font-normal">{currentPoke.base_experience
                            }</span></p>

                            <p className={`font-semibold text-[14px]`}>Attack: <span className="font-normal">

                                {currentPoke.stats[1].base_stat}
                                
                                </span></p>
                            <p className={`font-semibold text-[14px]`}>Abilities: <span className="font-normal">
                                {
                                    currentPoke.abilities[0].ability.name

                                }
                                
                                </span></p>
                         </div>
                        


                        </div>
                        
                    </div>
                   
                </li>
            })}
        </ul>
      </div>
    </section>
    </>
  );
};
