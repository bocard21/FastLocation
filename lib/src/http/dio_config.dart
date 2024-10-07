import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';

class DioConfig {
  static Future<Dio> getConnection() async {
    final dio = Dio();

    dio.options = BaseOptions(
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 10),
    );

    dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          if (kDebugMode) {
            debugPrint('------ Request log ------');
            debugPrint('URI: ${options.uri}');
            debugPrint('Headers: ${options.headers}');
          }
          handler.next(options);
        },
        onResponse: (response, handler) {
          if (kDebugMode) {
            debugPrint('------ Response log ------');
            debugPrint('Status Code: ${response.statusCode}');
            debugPrint('Response: ${response.data}');
          }
          handler.next(response);
        },
        onError: (DioException error, handler) {
          if (kDebugMode) {
            debugPrint('------ Error log ------');
            debugPrint('Error: ${error.message}');
            if (error.response != null) {
              debugPrint('Error Response: ${error.response?.data}');
            }
          }
          handler.next(error);
        },
      ),
    );

    return dio;
  }
}
