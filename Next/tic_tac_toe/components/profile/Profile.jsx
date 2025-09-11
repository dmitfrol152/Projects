import Image from "next/image";
import avatarSrc from "../../app/assets/images/avatar.png";

export function Profile({ name, rating, avatar = avatarSrc }) {
  return (
    <div className="flex items-center gap-2 text-start text-teal-600">
      <Image src={avatar} alt="Avatar" width={48} height={48} unoptimized />
      <div className="overflow-hidden">
        <span className="block text-lg leading-[1.2] truncate">{name}</span>
        <span className="text-slate-400 block text-xs leading-[1.2]">
          Рейтинг: {rating}
        </span>
      </div>
    </div>
  );
}
