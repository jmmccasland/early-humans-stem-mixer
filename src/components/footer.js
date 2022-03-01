import IconTwitter from "../icons/twitter";
import IconTiktok from "../icons/tiktok";
import IconFb from "../icons/facebook-icon";
import IconIg from "../icons/ig-icon";

export default function Footer() {
  return (
    <footer className="p-4 font-stilson text-white text-center">
      <ul className="flex items-center text-white gap-1 py-4 justify-center">
        <li className="mx-3"><a className="w-10 h-10" target="_blank" rel="noreferrer" href="https://www.twitter.com/early__humans" alt="Follow Early Humans on Twitter"><IconTwitter /></a></li>
        <li className="mx-3"><a className="w-6" target="_blank" rel="noreferrer" href="https://www.instagram.com/early__humans/" alt="Follow Early Humans on Instagram"><IconIg /></a></li>
        <li className="mx-3"><a className="w-6" target="_blank" rel="noreferrer" href="https://m.facebook.com/earlyhumansband/" alt="Follow Early Humans on Facebook"><IconFb /></a></li>
        <li className="mx-3"><a className="w-6" target="_blank" rel="noreferrer" href="https://vm.tiktok.com/TTPdS3F6DP/" alt="Follow Early Humans on Tiktok"><IconTiktok /></a></li>
      </ul>
      <p>copyright &copy; {new Date().getFullYear()} early humans </p>
    </footer>
  )
}
