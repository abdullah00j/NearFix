declare global {
  interface Window {
    AgentPet?: {
      setState: (state: string) => void;
      say: (
        message: string,
        options?: {
          ttl?: number;
          link?: string;
        },
      ) => void;
      configure: (options: {
        name?: string;
        imageUrl?: string;
        useCodexAtlas?: boolean;
      }) => void;
    };
  }
}

export const agentPet = {
  thinking() {
    window.AgentPet?.setState("thinking");
  },

  searching() {
    window.AgentPet?.setState("building");
  },

  success(message: string) {
    window.AgentPet?.setState("success");
    window.AgentPet?.say(message, {
      ttl: 4000,
    });
  },

  error(message: string) {
    window.AgentPet?.setState("error");
    window.AgentPet?.say(message, {
      ttl: 4000,
    });
  },

  greet(message: string) {
    window.AgentPet?.setState("greeting");
    window.AgentPet?.say(message, {
      ttl: 1000,
    });
  },

  idle() {
    window.AgentPet?.setState("idle");
  },
};
