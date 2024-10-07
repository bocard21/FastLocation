import 'package:dio/dio.dart';
import 'package:hive/hive.dart';

class CepService {
  final Dio _dio = Dio();
  final Box<String> _enderecoBox = Hive.box<String>('enderecos');

  Future<Map<String, dynamic>?> buscarCep(String cep) async {
    try {
      final response = await _dio.get('https://viacep.com.br/ws/$cep/json/');
      if (response.statusCode == 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }

  Future<void> salvarEnderecoLocal(String cep, String endereco) async {
    if (_enderecoBox.isOpen) {
      await _enderecoBox.put(cep, endereco);
    }
  }

  Future<List<String>> listarHistorico() async {
    if (_enderecoBox.isOpen) {
      return _enderecoBox.values.toList();
    }
    return [];
  }
}
