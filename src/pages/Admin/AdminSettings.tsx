import { useEffect, useState } from "react";
import AdminPageHeader from "@/components/Pages/ADMIN/Shared/AdminPageHeader";
import SettingLanguagePrefrences from "@/components/Pages/COMMONPAGES/Setting/SettingLanguagePrefrences";
import SettingNotificationAppearance from "@/components/Pages/COMMONPAGES/Setting/SettingNotificationAppearance";
import SettingthemeAppearance from "@/components/Pages/COMMONPAGES/Setting/SettingthemeAppearance";

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

function getStoredPreferences(): NotificationPreferences {
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
}

function getStoredTheme(): Theme {
  const theme = localStorage.getItem("theme");
  return theme === "Light" || theme === "Dark" || theme === "System"
    ? theme
    : "Light";
}

export default function AdminSettings() {
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
    <section className="mx-auto max-w-[1000px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <AdminPageHeader
        title="Settings"
        description="Personalize your admin workspace and notification preferences."
      />

      <div>
        <h2 className="text-lg font-semibold">Workspace preferences</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          These preferences are saved in this browser and apply to your NearFix
          workspace.
        </p>
      </div>

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
