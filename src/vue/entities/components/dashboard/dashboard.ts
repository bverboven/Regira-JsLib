import type { IConfig } from "../../../entities";

export type DashboardItem = {
  name: string;
  title: string;
  icon: string;
  description?: string;
  initialQuery?: Record<string, any>;
};

export function toDashboardItem(config: IConfig) {
  return {
    name: `${config.id}Overview`,
    title: config.overviewTitle || `${config.id}`,
    icon: config.id,
    description: config.description,
    initialQuery: config.initialQuery,
  };
}
