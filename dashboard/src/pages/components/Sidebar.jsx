import React from "react";
import { NavLink } from "react-router-dom";
import NavData from "../api/Navdata.json";

const Sidebar = () => {
  const [openIndex, setOpenIndex] = React.useState(null);
  const toggleCollapse = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="h-page overflow-auto bg-white rounded-10">
      <div className="px-15 py-20">
         <div className="flex items-center gap-8">
            <img
              src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"
              alt="header-img"
              className="common-img rounded-full flex"
            />
            <div>
              <h2 className="mid-text text-primary uppercase">Raj Shetye</h2>
              <p className="mini-text text-gray">Admin</p>
            </div>
          </div>
      </div>
      <div className="py-8 px-10">
        <div className="grid-cols-1 gap-4">
          {NavData.filter((item) => item.status).map((item, index) => (
            <div key={index}>
              <NavLink
                to={item.category?.length > 0 ? null : item?.route}
                className={({ isActive }) =>
                  `flex justify-between items-center cursor-pointer rounded-5 px-12 py-${
                    isActive ? "11" : "8"
                  } ${
                    isActive && !item.category?.length
                      ? "bg-primary text-white"
                      : "bg-white text-gray"
                  }`
                }
                onClick={() => toggleCollapse(index)}
              >
                <div className="flex items-center gap-12">
                  <div className="icon flex items-center justify-center bg-forth rounded-full">
                    <span className="flex ml-1 text-primary" dangerouslySetInnerHTML={{ __html: item.icon }} />
                  </div>
                  <p className="small-text">{item.name}</p>
                </div>
                {item.category?.length > 0 && (
                  <>
                    {openIndex === index ? (
                      <svg
                        viewBox="0 0 24 24"
                        width="15"
                        height="15"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="flex text-gray"
                      >
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        width="15"
                        height="15"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="flex text-gray"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    )}
                  </>
                )}
              </NavLink>
              {openIndex === index && item.category?.length > 0 && (
                <div className="grid-cols-1 gap-4 px-10 py-5">
                  {item.category
                    .filter((sub) => sub.status)
                    .map((sub, subIndex) => (
                      <NavLink
                        key={subIndex}
                        className={({ isActive }) =>
                          `flex items-center cursor-pointer gap-6 px-15 py-${
                            isActive ? "12 bg-tertiary rounded-5 text-primary" : "6 text-gray"
                          }`
                        }
                        to={sub?.route}
                      >
                        <span dangerouslySetInnerHTML={{ __html: sub.icon }} />
                        <p className="small-text text-gray">{sub.name}</p>
                      </NavLink>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;