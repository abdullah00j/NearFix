import { useEffect, useState } from "react";
import SettingHeader from "../../component/Pages/Setting/SettingHeader";
import SettingthemeAppearance from "../../component/Pages/Setting/SettingthemeAppearance";
import SettingNotificationAppearance from "../../component/Pages/Setting/SettingNotificationAppearance";
import SettingLanguagePrefrences from "../../component/Pages/Setting/SettingLanguagePrefrences";

type Theme = "Light" | "Dark" | "System";
type NotificationPreferences = {
  bookingUpdates: boolean;
  messages: boolean;
  promotions: boolean;
};

const preferenceStorageKey = "nearfix:notification-preferences";
const defaultPreferences: NotificationPreferences = {
  bookingUpdates: true,
  messages: true,
  promotions: false,
};

const getStoredPreferences = (): NotificationPreferences => {
  const savedPreferences = localStorage.getItem(preferenceStorageKey);
  if (!savedPreferences) return defaultPreferences;

  try {
    const parsed: unknown = JSON.parse(savedPreferences);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "bookingUpdates" in parsed &&
      "messages" in parsed &&
      "promotions" in parsed &&
      typeof parsed.bookingUpdates === "boolean" &&
      typeof parsed.messages === "boolean" &&
      typeof parsed.promotions === "boolean"
    ) {
      return {
        bookingUpdates: parsed.bookingUpdates,
        messages: parsed.messages,
        promotions: parsed.promotions,
      };
    }
  } catch {
    return defaultPreferences;
  }

  return defaultPreferences;
};

const getStoredTheme = (): Theme => {
  const theme = localStorage.getItem("theme");
  return theme === "Light" || theme === "Dark" || theme === "System"
    ? theme
    : "Light";
};

export default function SettingsPage() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);
  const [preferences, setPreferences] =
    useState<NotificationPreferences>(getStoredPreferences);
  const [language, setLanguage] = useState("English");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    window.dispatchEvent(new Event("nearfix:themechange"));
  }, [theme]);

  const updatePreference = (key: keyof NotificationPreferences) => {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
    setSaved(false);
  };

  const savePreferences = () => {
    localStorage.setItem(preferenceStorageKey, JSON.stringify(preferences));
    setSaved(true);
  };

  return (
    <section className="mx-auto max-w-[1000px] space-y-7 px-1 py-2 text-[var(--text)] md:px-2">
      <SettingHeader />

      <SettingthemeAppearance theme={theme} setTheme={setTheme} />

      <SettingNotificationAppearance
        updatePreference={updatePreference}
        savePreferences={savePreferences}
        preferences={preferences}
        saved={saved}
      />

      <SettingLanguagePrefrences
        language={language}
        setLanguage={setLanguage}
      />
    </section>
  );
}
