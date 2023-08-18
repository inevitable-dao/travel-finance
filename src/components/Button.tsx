export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'primary' | 'secondary';
};

export const Button = ({ variant, ...props }) => {
  return (
    <button
      className="px-12 py-4 font-bold transition-all shadow-2xl bg-slate-100 hover:bg-slate-200 shadow-slate-300/40 hover:text-zinc-950 hover:shadow-slate-300/65"
      {...props}
    />
  );
};
