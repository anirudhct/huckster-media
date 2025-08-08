export default function FloatingTextarea({
  className,
  id,
  label,
  ...rest
}: {
  className?: string;
  id: string;
  label: string;
  [key: string]: any;
}) {
  return (
    <div className={`relative z-0 ${className}`}>
      <textarea
        id={id}
        {...rest}
        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-black focus:ring-0 focus:outline-none"
        placeholder=""
      />
      <label
        htmlFor={id}
        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-black"
      >
        {label}
      </label>
    </div>
  );
}
