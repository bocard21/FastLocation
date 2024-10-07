import 'package:hive/hive.dart';

class LocalStorageRepository {
  final Box<String> _enderecoBox;

  LocalStorageRepository(this._enderecoBox);

  Future<void> salvarEndereco(String endereco) async {
    await _enderecoBox.add(endereco);
  }

  List<String> recuperarHistorico() {
    return _enderecoBox.values.toList();
  }

  bool isBoxOpen() {
    return _enderecoBox.isOpen;
  }
}
