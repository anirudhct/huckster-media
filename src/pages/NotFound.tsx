import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="text-accentteal flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      <h1 className="font-anton text-blue-dark text-center text-[52vw]">404</h1>

      <div className="font-anton absolute top-[50%] right-0 left-0 w-full text-center text-xl text-white sm:text-[2vw]">
        The Page you are looking for doesn't
        <br />
        exist or an other error occurred.
        <Link
          to="/"
          className="text-accentorange mt-5 block text-[5vw] underline"
        >
          Go back
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
