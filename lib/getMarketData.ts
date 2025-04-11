export async function getMarketData() {
    const res = await fetch(`http://localhost:3001/api/sheet`, {
        next: { revalidate: 60 },// Para evitar caché si usás dev
    });
  
    const data = await res.json(); // data: string[][]
  
    const transformed = data.map((row: string[]) =>
      row.map((item: string) => {
        const parts = item?.split("-").map((p) => p.trim()) ?? [];
        return {
          id: item || "",
          info: parts,
        };
      })
    );
  
    return transformed;
  }