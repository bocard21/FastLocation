import 'package:dio/dio.dart';
import 'package:flutter/material.dart';

class CepRepository {
  final Dio _dio;

  CepRepository()
      : _dio = Dio(BaseOptions(
          connectTimeout: const Duration(seconds: 10),
          receiveTimeout: const Duration(seconds: 10),
        ));

  Future<Map<String, dynamic>?> buscarCep(String cep) async {
    try {
      final response = await _dio.get('https://viacep.com.br/ws/$cep/json/');
      return response.data;
    } catch (e) {
      debugPrint('Erro ao buscar o CEP: $e');
      return null;
    }
  }
}
