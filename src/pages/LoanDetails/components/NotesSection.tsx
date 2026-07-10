type Props = {
  text: string;
};

const NotesSection = ({ text }: Props) => {
  return (
    <div className="rounded-xl bg-[#f7f6fa] px-5 py-4">
      <p className="text-[14px] leading-relaxed text-[#4b4a53]">{text}</p>
    </div>
  );
};

export default NotesSection;
