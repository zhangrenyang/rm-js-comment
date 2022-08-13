# remove-js-comment
This vscode-plugin can delete all JavaScript comments with one click

# usage
![remove-js-comment](https://static.zhufengpeixun.com/rmjscomment_1660402929821.png)

# config

File=>Preferences=>Settings=>Extensions=>rm-js-comment

![](https://static.zhufengpeixun.com/settings_1660403088546.png)

![](https://static.zhufengpeixun.com/settings2_1660403101184.png)

settings.json

```json
{
    "rm-js-comment.replacer": {
        "__WEBPACK": "",
        "__webpack_handle_async_dependencies__": "async_dependencies",
        "IMPORTED_MODULE_": "",
        "__WEBPACK_DEFAULT_EXPORT__": "DEFAULT_EXPORT",
        "__webpack_exports__": "exports",
        "__unused_webpack_module": "module",
        "__WEBPACK_EXTERNAL_MODULE_": "EXTERNAL_MODULE_",
        "__WEBPACK_DYNAMIC_EXPORT__": "DYNAMIC_EXPORT",
        "__system_context__": "system_context",
        "__webpack_require__": "require",
        "__webpack_module_cache__": "cache",
        "__webpack_modules__": "modules",
        "__WEBPACK_IMPORTED_MODULE_": "_IMPORTED_MODULE_",
        "/*#__PURE__*/": "",
        "___EXPOSE_LOADER_IMPORT___": "EXPOSE_IMPORT",
        "___EXPOSE_LOADER_GET_GLOBAL_THIS___": "GET_GLOBAL_THIS",
        "___EXPOSE_LOADER_GLOBAL_THIS___": "GLOBAL_THIS"
    }
}
```