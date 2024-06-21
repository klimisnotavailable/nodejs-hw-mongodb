import globals from "globals";
import pluginJs from "@eslint/js";


// export default [
//   {languageOptions: { globals: globals.node }},
//   pluginJs.configs.recommended,
// ];

export default [
  pluginJs.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: { globals: globals.node },
    rules: {
	    semi: 'error',
	    'no-unused-vars': 'error',
	    'no-undef': 'error'
	  },
  },
];
