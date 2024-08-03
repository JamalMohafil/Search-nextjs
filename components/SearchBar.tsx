"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {};

const SearchBar = (props: Props) => {
  const [games, setGames] = useState<String[]>([]);
  const [results,setResults] = useState<any>([])
  const [loading, setLoading] = useState<Boolean>(true);
  useEffect(() => {
    const fet = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (res.ok) {
          setGames(data.games);
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
        throw e;
      }
    };
    fet();
  }, []);
  const searchAction = async (event: any) => {
    const value = event.target.value;
    if(value.length < 1){
      setResults([])
    }
    if (value.length > 0 && games.length > 0) {
      setLoading(true)
      setTimeout(()=>{
        
        const newGames = games.filter(
          (game: any) =>
            game.name.includes(value) || game.description.includes(value)
        );
        setResults(newGames)
        setLoading(false)
      },1000)
      }
    
  };
  console.log(results)
  return (
    <div className="relative">
      <input
        type="search"
        placeholder="Search..."
        onChange={searchAction}
        className="w-[300px] rounded-md h-[30px] px-3 py-2 text-white bg-[#0d141d] outline-none border border-white/20 focus:border-[#4744e6]
        "
      />
      <div
        className="w-[300px] absolute top-[115%] left-0 h-[200px] overflow-auto bg-[#0d141d]
       rounded-md flex justify-start flex-col items-center px-3 py-2"
      >
        {loading ? (
          <div className="spinner"></div>
        ) : results.length > 0 ? results.map((game:any)=>(
          <a href="/" className="w-full hover:bg-white/20 gap-2 px-3 py-2 flex justify-start items-center ">
            <Image width={40} height={40} src={game.image} alt="game image"/>
            <p className="text-ellipsis overflow-hidden">{game.name}</p>
          </a>
        )) : (
          <p className="text-white">No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
