import Logo from "../../src/Assets/yavuzlar.png";
import BackgroundImage from "../../src/Assets/Background.svg";

export default function MainPage() {
  return (
    <>
      <div
        style={{ backgroundImage: "url(" + BackgroundImage + ")" }}
        className="flex justify-center items-center h-screen"
      >
        <div className="w-3/5 h-1/2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col justify-center items-center pb-10 w-full h-full">
            <img
              className="mb-3 w-48 h-48 rounded-full shadow-lg"
              src={Logo}
              alt="Yavuzlar"
            />
            <h5 className="mb-1 text-6xl font-semibold text-gray-800 dark:text-white">
              To-Do List
            </h5>
            <div className="flex mt-8 space-x-3 md:mt-12">
              <a
                href="/register"
                className="inline-flex items-center py-2 px-12 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register
              </a>
              <a
                href="login"
                className="inline-flex items-center py-2 px-14 text-base font-medium text-center text-blue-700 bg-white rounded-lg border border-blue-700 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 "
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
