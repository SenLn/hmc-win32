﻿#include "./export.h"
#include "hmc_screen_util.h"
#include "hmc_napi_value_util.h"
#include "hmc_windows_util.h"

napi_value captureBmpToFile(napi_env env, napi_callback_info info)
{
    napi_value result = as_Null();
    auto input = hmc_NodeArgsValue(env, info);
    input.eq({{0, js_string},
              {1, js_number},
              {2, js_number},
              {3, js_number},
              {4, js_number}},
             true);

    std::wstring BmpFilePath = at_StringW(0);
    int ix = at_Number32(1);
    int iy = at_Number32(2);
    int nScopeWidth = at_Number32(3);
    int nScopeHeight = at_Number32(4);

    hmc_screen_util::captureBmpToFile(BmpFilePath, ix, iy, nScopeWidth, nScopeHeight);

    return result;
}

napi_value captureBmpToBuff(napi_env env, napi_callback_info info)
{
    napi_value result = as_Null();
    auto input = hmc_NodeArgsValue(env, info);
    input.eq({{0, js_number},
              {1, js_number},
              {2, js_number},
              {3, js_number}},
             true);

    int ix = at_Number32(0);
    int iy = at_Number32(1);
    int nScopeWidth = at_Number32(2);
    int nScopeHeight = at_Number32(3);

    std::vector<std::uint8_t> buffer;

    hmc_screen_util::captureBmpToBuffer(buffer, ix, iy, nScopeWidth, nScopeHeight);

    if (!buffer.empty())
    {
        result = as_Buffer(buffer);
        return result;
    }

    return result;
}

namespace exp_captureBmp2
{
    NEW_PROMISE_FUNCTION2_DEFAULT_FUN;

    // (handle: number): Promise<Buffer | null>;
    // (handle: number, path: string): Promise<boolean>;
    // (path: string): Promise<boolean>;
    // (): Promise<Buffer| null>;
    // (x: number, y: number, nScopeWidth: number, nScopeHeight: number): Promise<Buffer | null>;
    // (path: string, x: number, y: number, nScopeWidth: number, nScopeHeight: number): Promise<boolean>;

    void exp_captureBmp2::AddArgsToCallBack(napi_env env, napi_callback_info info, std::vector<std::any> *ArgumentsList, hmc_NodeArgsValue input)
    {
        if (input.size() < 1)
        {
            return;
        }

        // 0 : handle: number / path: string
        if (input.eq(0, {js_number, js_string}, true))
        {
            if (input.eq(0, js_string, false))
            {
                auto temp = input.getStringWide(0, L"");
                arguments_list.push_back(temp);
            }
            if (input.eq(0, js_number, false))
            {
                auto temp = input.getInt64(0, 0);
                arguments_list.push_back(temp);
            }
        }

        if (input.size() >= 2 && input.eq(1, {js_number, js_string}, true))
        {

            if (input.eq(1, js_string, false))
            {
                auto temp = input.getStringWide(1, L"");
                arguments_list.push_back(temp);
            }
            if (input.eq(1, js_number, false))
            {
                auto temp = input.getInt64(1, 0);
                arguments_list.push_back(temp);
            }
        }

        if (input.size() >= 3 && input.eq(2, {js_number}, true))
        {
            auto temp = input.getInt64(2, 0);
            arguments_list.push_back(temp);
        }

        if (input.size() >= 4 && input.eq(3, {js_number}, true))
        {
            auto temp = input.getInt64(3, 0);
            arguments_list.push_back(temp);
        }

        if (input.size() >= 5 && input.eq(4, {js_number}, true))
        {
            auto temp = input.getInt64(4, 0);
            arguments_list.push_back(temp);
        }
    }

    // 需要异步的函数
    std::any exp_captureBmp2::PromiseWorkFunc(std::vector<std::any> *arguments_list)
    {
        std::any result = std::any();

        // (): Promise<Buffer| null>;
        if (arguments_list->size() < 1)
        {
            std::vector<std::uint8_t> buffer;

            hmc_screen_util::captureBmpToBuffer(buffer, 0, 0, 0, 0);

            if (!buffer.empty())
                result = buffer;

            return result;
        }

        //  (path: string): Promise<boolean>;
        if (arguments_list->size() == 1 && arguments_list->at(0).type() == typeid(std::wstring))
        {

            bool is_captureBmp_ok = hmc_screen_util::captureBmpToFile(std::any_cast<std::wstring>(arguments_list->at(0)), 0, 0, 0, 0);
            result = is_captureBmp_ok;
            return result;
        }

        // (handle: number): Promise<Buffer | null>;
        // (handle: number, path: string): Promise<boolean>;
        if ((arguments_list->size() == 1 || arguments_list->size() == 2) && arguments_list->at(0).type() == typeid(int64_t))
        {

            auto rect_temp = hmc_windows_util::getWindowRect((HWND)std::any_cast<int64_t>(arguments_list->at(0)));

            // 没有找到窗口
            if (rect_temp.index() != 0)
            {
                if (arguments_list->size() == 1)
                    return result;

                if (arguments_list->size() == 2)
                {
                    result = false;
                    return result;
                }
            }

            auto rect = std::get<RECT>(rect_temp);

            LONG x = rect.left;
            LONG y = rect.top;
            LONG width = rect.right - rect.left;
            LONG height = rect.bottom - rect.top;

            if (arguments_list->size() == 1)
            {

                std::vector<std::uint8_t> buffer;
                bool is_captureBmp_ok = hmc_screen_util::captureBmpToBuffer(buffer, x, y, width, height);

                if (!buffer.empty())
                    result = buffer;
            }

            if (arguments_list->size() == 2 && arguments_list->at(1).type() == typeid(std::wstring))
            {

                std::wstring file_path = std::any_cast<std::wstring>(arguments_list->at(1));
                bool is_captureBmp_ok = hmc_screen_util::captureBmpToFile(file_path, x, y, width, height);
                result = is_captureBmp_ok;
            }

            return result;
        }

        // (x: number, y: number, nScopeWidth: number, nScopeHeight: number): Promise<Buffer | null>;
        if (arguments_list->size() == 4 && (arguments_list->at(0).type() == typeid(int64_t) &&
                                            arguments_list->at(1).type() == typeid(int64_t) &&
                                            arguments_list->at(2).type() == typeid(int64_t) &&
                                            arguments_list->at(3).type() == typeid(int64_t)))
        {
            int64_t x = std::any_cast<int64_t>(arguments_list->at(0));
            int64_t y = std::any_cast<int64_t>(arguments_list->at(1));
            int64_t width = std::any_cast<int64_t>(arguments_list->at(2));
            int64_t height = std::any_cast<int64_t>(arguments_list->at(3));
            std::vector<std::uint8_t> buffer;
            bool is_captureBmp_ok = hmc_screen_util::captureBmpToBuffer(buffer, x, y, width, height);

            if (!buffer.empty())
                result = buffer;
            return result;
        }

        // (path: string, x: number, y: number, nScopeWidth: number, nScopeHeight: number): Promise<boolean>;
        if (arguments_list->size() == 5 && (arguments_list->at(0).type() == typeid(std::wstring) &&
                                            arguments_list->at(1).type() == typeid(int64_t) &&
                                            arguments_list->at(2).type() == typeid(int64_t) &&
                                            arguments_list->at(3).type() == typeid(int64_t) &&
                                            arguments_list->at(4).type() == typeid(int64_t)))
        {

            std::wstring file_path = std::any_cast<std::wstring>(arguments_list->at(0));

            int64_t x = std::any_cast<int64_t>(arguments_list->at(1));
            int64_t y = std::any_cast<int64_t>(arguments_list->at(2));
            int64_t width = std::any_cast<int64_t>(arguments_list->at(3));
            int64_t height = std::any_cast<int64_t>(arguments_list->at(4));

            bool is_captureBmp_ok = hmc_screen_util::captureBmpToFile(file_path, x, y, width, height);
            result = is_captureBmp_ok;
            return result;
        }
        return result;
    }

    // 格式化<需要异步的函数>返回值到js 返回值
    napi_value exp_captureBmp2::FormatResultValue(napi_env env, std::any *result_any_data)
    {
        napi_value result;
        napi_get_null(env, &result);

        if (!result_any_data->has_value())
        {
            return result;
        }

        if (result_any_data->type() == typeid(bool))
        {

            result = as_Boolean(std::any_cast<bool>(result_any_data));
            return result;
        }

        if (result_any_data->type() == typeid(std::vector<uint8_t>))
        {
            auto buffer = std::any_cast<std::vector<uint8_t>>(result_any_data);

            if (!buffer->empty())
            {
                result = as_Buffer(*buffer);
                return result;
            }

            return result;
        }

        return result;
    }

};

void exports_screen_async_fun(napi_env env, napi_value exports)
{
    PromiseFunctionUtil::exports(env, exports, "captureBmp2", exp_captureBmp2::startWork, exp_captureBmp2::startSync);
}
