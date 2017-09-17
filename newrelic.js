exports.config = {
  app_name: [`www-app-${process.env.APP_ENV}`,],
  agent_enabled: false,
  capture_params: true,
  logging: {
    level: 'info',
    filepath: 'stdout',
    enabled: false,
  },
  utilization: {
    detect_aws: false,
    detect_pcf: false,
    detect_azure: false,
    detect_docker: true,
    detect_gcp: false,
  },
  rules: {
    name: [],
    ignore: [
      '^\/socket\.io\/.*\/xhr-polling/',
    ],
  },
  browser_monitoring: {
    enable: false,
  },
  api: {
    custom_parameters_enabled: false,
    custom_events_enabled: false,
    notice_error_enabled: false,
  },
};
