
import art from "../bounces/art.jpeg";

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-center pt-8 px-8 pb-2">
      <a target="_blank" rel="noreferrer" href="https://onerpm.link/132791051547">
        <img className="w-48" src={art} alt="Lenny by Early Humans" />
      </a>
      <h1 className="mt-4 font-stilson text-white text-3xl font-bold">lenny by early humans</h1>
      <p className="font-stilson text-white text-xl font-bold">mixed and mastered by jesse cannon</p>
    </header>
  )
}
