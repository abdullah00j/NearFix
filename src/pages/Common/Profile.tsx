import { useEffect, useState } from "react";
import { Camera, ChevronDown, ImagePlus, Info, Trash2 } from "lucide-react";
import { useGetUser } from "../../hooks/usegetUser";
import ProfileSkeleton from "../../skeletons/ProfileSkeleton";

type Theme = "Light" | "Dark" | "System";

type Device = {
  id: number;
  os: string;
  browser: string;
  location: string;
  current: boolean;
};

const Profile = () => {
  const { user, loading, error } = useGetUser();
  const userProfile = {
    name: user?.name ?? "",
    profileImage: user?.profileImage ?? "",
    email: user?.email ?? "",
  };

  const [language, setLanguage] = useState("English");

  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");

    if (
      savedTheme === "Light" ||
      savedTheme === "Dark" ||
      savedTheme === "System"
    ) {
      return savedTheme;
    }

    return "Light";
  });

  const [newsletterEnabled, setNewsletterEnabled] = useState(true);

  const [devices, setDevices] = useState<Device[]>([
    {
      id: 1,
      os: "Windows 10",
      browser: "Chrome 153",
      location: "101.53.234.32",
      current: true,
    },
  ]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    window.dispatchEvent(new Event("nearfix:themechange"));
  }, [theme]);

  const handleChangePhoto = () => {
    console.log("Change profile photo clicked");
  };

  const handleNewsletterToggle = () => {
    setNewsletterEnabled((previous) => !previous);
  };

  const handleRemoveDevice = (deviceId: number) => {
    setDevices((previousDevices) =>
      previousDevices.filter((device) => device.id !== deviceId),
    );
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <main
      className={`
       
        px-6
        py-8
        
        duration-300
        text-slate-900 dark:text-slate-100
      `}
    >
      <div className="mx-auto max-w-[1280px] ">
        <section>
          <h1
            className={`
              text-xl
              font-medium
              text-slate-900 dark:text-slate-100
            `}
          >
            Profile
          </h1>

          {/* ================= AVATAR ================= */}

          <div className="mt-8">
            <p
              className={`
                mb-3
                text-sm
                font-medium
                text-slate-800 dark:text-slate-200
              `}
            >
              Avatar
            </p>

            <div className="group relative h-16 w-16">
              <button
                type="button"
                onClick={handleChangePhoto}
                aria-label="Change profile picture"
                className="
                  relative
                  h-16
                  w-16
                  overflow-hidden
                  rounded-full
                  outline-none
                  ring-offset-2
                  
                  focus-visible:ring-2
                  focus-visible:ring-slate-500
                "
              >
                {/* Avatar */}

                <div
                  className="
                    flex
                    h-full
                    w-full
                    items-center
                    justify-center
                    bg-green-800
                    text-3xl
                    font-normal
                    text-white
                  "
                >
                  <img src={userProfile.profileImage} alt="Profile" />
                </div>

                {/* Hover Overlay */}

                <div
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    bg-black/55
                    opacity-0
                    transition-opacity
                    duration-200
                    group-hover:opacity-100
                  "
                >
                  <Camera size={22} className="text-white" />
                </div>
              </button>
            </div>

            {/* Change Photo */}

            <button
              type="button"
              onClick={handleChangePhoto}
              className={`
                mt-3
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                px-3
                py-2
                text-sm
                font-medium
                
                border-slate-300 dark:border-[#3a3a3a]
                text-slate-800 dark:text-slate-200
                hover:bg-slate-50 dark:hover:bg-[#222222]
              `}
            >
              <ImagePlus size={16} />
              Change photo
            </button>
          </div>

          {/* ================= NAME ================= */}

          <div className="mt-5 w-full max-w-[320px]">
            <label
              htmlFor="name"
              className={`
                mb-2
                block
                text-sm
                font-medium
                text-slate-800 dark:text-slate-200
              `}
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              value={userProfile.name}
              // onChange={(event) => setName(event.target.value)}
              className={`
                h-10
                w-full
                rounded-lg
                border
                px-3
                text-sm
                outline-none
                
                bg-white dark:bg-[#1b1b1b]
                border-slate-300 dark:border-[#3a3a3a]
                text-slate-900 dark:text-white
                focus:border-slate-500 focus:ring-[#115e59] dark:focus:ring-[#14b8a6]
                focus:ring-2
              `}
            />
          </div>

          {/* ================= EMAIL ================= */}

          <div className="mt-5 w-full max-w-[320px]">
            <p
              className={`
                mb-2
                text-sm
                font-medium
                text-slate-800 dark:text-slate-200
              `}
            >
              Email
            </p>

            <p className={`text-sm text-slate-500 dark:text-slate-400`}>
              {userProfile.email}
            </p>
          </div>
        </section>

        {/* =================================================
            SYSTEM PREFERENCES
        ================================================= */}

        <section
          className={`
            mt-10
            border-t
            pt-10
            border-slate-200 dark:border-[#303030]
          `}
        >
          <h2
            className={`
              text-lg
              font-medium
              text-slate-900 dark:text-slate-100
            `}
          >
            System preferences
          </h2>

          <div
            className="
              mt-5
              flex
              flex-col
              gap-5
              sm:flex-row
            "
          >
            {/* ================= LANGUAGE ================= */}

            <div className="w-full max-w-[302px]">
              <label
                htmlFor="language"
                className={`
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-800 dark:text-slate-200
                `}
              >
                Language
              </label>

              <div className="relative">
                <select
                  id="language"
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className={`
                    h-10
                    w-full
                    appearance-none
                    rounded-lg
                    border
                    px-4
                    pr-10
                    text-sm
                    outline-none
                    
                    bg-white dark:bg-[#1b1b1b]
                    border-slate-300 dark:border-[#3a3a3a]
                    text-slate-900 dark:text-white
                    focus:ring-2
                    focus:border-slate-500 focus:ring-[#115e59] dark:focus:ring-[#14b8a6]
                  `}
                >
                  <option value="English">English</option>

                  <option value="Urdu">Urdu</option>
                </select>

                <ChevronDown
                  size={17}
                  className={`
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-800 dark:text-slate-200
                  `}
                />
              </div>
            </div>

            {/* ================= THEME ================= */}

            <div className="w-full max-w-[302px]">
              <label
                htmlFor="theme"
                className={`
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-800 dark:text-slate-200
                `}
              >
                Theme
              </label>

              <div className="relative">
                <select
                  id="theme"
                  value={theme}
                  onChange={(event) => setTheme(event.target.value as Theme)}
                  className={`
                    h-10
                    w-full
                    appearance-none
                    rounded-lg
                    border
                    px-4
                    pr-10
                    text-sm
                    outline-none
                    
                    bg-white dark:bg-[#1b1b1b]
                    border-slate-300 dark:border-[#3a3a3a]
                    text-slate-900 dark:text-white
                    focus:ring-2
                    focus:border-slate-500 focus:ring-[#115e59] dark:focus:ring-[#14b8a6]
                  `}
                >
                  <option value="Light">Light</option>

                  <option value="Dark">Dark</option>

                  <option value="System">System</option>
                </select>

                <ChevronDown
                  size={17}
                  className={`
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-800 dark:text-slate-200
                  `}
                />
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <section
          className={`
            mt-10
            border-t
            pt-10
            border-slate-200 dark:border-[#303030]
          `}
        >
          <h2
            className={`
              text-lg
              font-medium
              text-slate-900 dark:text-slate-100
            `}
          >
            Notifications
          </h2>

          <div className="mt-5">
            <div
              className="
                flex
                items-center
                justify-between
                gap-5
              "
            >
              <div>
                <h3
                  className={`
                    text-sm
                    font-medium
                    text-slate-900 dark:text-slate-100
                  `}
                >
                  Newsletter
                </h3>

                <p
                  className={`
                    mt-1
                    text-sm
                    text-slate-500 dark:text-slate-400
                  `}
                >
                  Receive newsletters, promotions and news from Magnific
                </p>
              </div>

              {/* Toggle */}

              <button
                type="button"
                onClick={handleNewsletterToggle}
                aria-label="Toggle newsletter notifications"
                aria-pressed={newsletterEnabled}
                className={`
                  relative
                  h-5
                  w-10
                  shrink-0
                  rounded-full
                  
                  duration-200
                  ${newsletterEnabled ? "bg-[#14b8a6]" : "bg-[#676868]"}
                `}
              >
                <span
                  className={`
                    absolute
                    top-0.5
                    h-4
                    w-4
                    rounded-full
                    bg-white
                    shadow-sm
                    
                    ${newsletterEnabled ? "left-[22px]" : "left-0.5"}
                  `}
                />
              </button>
            </div>

            <p
              className={`
                mt-5
                max-w-[1100px]
                text-xs
                leading-5
                text-slate-500 dark:text-slate-400
              `}
            >
              Magnific will process your data to send you information about our
              products and services, promotions, surveys, raffles, based on our
              legitimate interest, and updates from the creators you follow if
              you have consented to this. Your data will not be disclosed to
              third parties. They will be communicated outside the EU under the
              terms of the privacy policy.
            </p>

            <button
              type="button"
              className="
                mt-2
                inline-flex
                items-center
                gap-1
                text-xs
                font-medium
                text-blue-500
                hover:underline
              "
            >
              More information
              <Info size={13} />
            </button>
          </div>
        </section>

        {/* =================================================
            SESSIONS & DEVICES
        ================================================= */}

        <section
          className={`
            mt-10
            border-t
            pt-10
            border-slate-200 dark:border-[#303030]
          `}
        >
          {/* Heading */}

          <div className="flex flex-wrap items-center gap-3">
            <h2
              className={`
                text-lg
                font-medium
                text-slate-900 dark:text-slate-100
              `}
            >
              Sessions & devices
            </h2>

            <span
              className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-medium
                bg-slate-100 text-slate-700 dark:bg-[#252525] dark:text-slate-300
              `}
            >
              {devices.length}/3 devices
            </span>
          </div>

          <p
            className={`
              mt-5
              text-sm
              text-slate-500 dark:text-slate-400
            `}
          >
            For security reasons, each account is limited to three connected
            devices.
          </p>

          {/* Device Table */}

          <div className="mt-7 overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead>
                <tr
                  className={`
                    border-b
                    border-slate-200 dark:border-[#303030]
                  `}
                >
                  <th
                    className={`
                      px-4
                      py-3
                      text-xs
                      font-medium
                      text-slate-800 dark:text-slate-200
                    `}
                  >
                    OS
                  </th>

                  <th
                    className={`
                      px-4
                      py-3
                      text-xs
                      font-medium
                      text-slate-800 dark:text-slate-200
                    `}
                  >
                    Browser
                  </th>

                  <th
                    className={`
                      px-4
                      py-3
                      text-xs
                      font-medium
                      text-slate-800 dark:text-slate-200
                    `}
                  >
                    Location
                  </th>

                  <th
                    className={`
                      px-4
                      py-3
                      text-xs
                      font-medium
                      text-slate-800 dark:text-slate-200
                    `}
                  >
                    Last session
                  </th>

                  <th className="px-4 py-3" />
                </tr>
              </thead>

              <tbody>
                {devices.map((device) => (
                  <tr
                    key={device.id}
                    className={`
                      border-b
                      border-slate-200 dark:border-[#303030]
                    `}
                  >
                    {/* OS */}

                    <td
                      className={`
                        px-4
                        py-5
                        text-sm
                        text-slate-900 dark:text-slate-100
                      `}
                    >
                      {device.os}
                    </td>

                    {/* Browser */}

                    <td
                      className={`
                        px-4
                        py-5
                        text-sm
                        text-slate-500 dark:text-slate-400
                      `}
                    >
                      {device.browser}
                    </td>

                    {/* Location */}

                    <td
                      className={`
                        px-4
                        py-5
                        text-sm
                        text-slate-500 dark:text-slate-400
                      `}
                    >
                      {device.location}
                    </td>

                    {/* Last Session */}

                    <td className="px-4 py-5">
                      <div
                        className={`
                          flex
                          items-center
                          gap-2
                          text-sm
                          text-slate-500 dark:text-slate-400
                        `}
                      >
                        <span
                          className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-emerald-500
                          "
                        />

                        {device.current
                          ? "This device"
                          : "Last active recently"}
                      </div>
                    </td>

                    {/* Delete Device */}

                    <td className="px-4 py-5 text-right">
                      {!device.current && (
                        <button
                          type="button"
                          onClick={() => handleRemoveDevice(device.id)}
                          aria-label="Remove device"
                          className="
                            text-slate-400
                            
                            hover:text-red-500
                          "
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =================================================
            DELETE ACCOUNT
        ================================================= */}

        <section
          className={`
            mt-10
            border-t
            pt-10
            pb-12
            border-slate-200 dark:border-[#303030]
          `}
        >
          <button
            type="button"
            // onClick={}
            className="
              rounded-lg
              bg-[#0f766e]
              px-4
              py-2.5
              text-sm
              font-medium
              text-white
              
              hover:bg-[#14b8a6]
            "
          >
            Delete account
          </button>
        </section>
      </div>
    </main>
  );
};

export default Profile;
