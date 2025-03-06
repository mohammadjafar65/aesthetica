import { useLocation } from 'react-router-dom';

const BottomMenu = () => {
  const location = useLocation();

  return (
    <>
      <div className="fixed bottom-[50px] left-0 flex items-center justify-center w-full z-10">
        <div className="backdrop-blur-sm bg-[#262626]/[50%] rounded-[50px] py-2 px-2 flex items-center gap-2">
          <a
            href="/"
            className={`${
              location.pathname === '/' ? 'bg-white text-black' : 'text-white'
            } py-2 px-5 rounded-[50px]`}
          >
            Phone
          </a>
          <a
            href="/desktop"
            className={`${
              location.pathname === '/desktop' ? 'bg-white text-black' : 'text-white'
            } py-2 px-5 rounded-[50px]`}
          >
            Desktop
          </a>
          <a
            href="/tablet"
            className={`${
              location.pathname === '/tablet' ? 'bg-white text-black' : 'text-white'
            } py-2 px-5 rounded-[50px]`}
          >
            Tablet
          </a>
        </div>
      </div>
    </>
  );
};

export default BottomMenu;
