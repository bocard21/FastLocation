import 'package:mobx/mobx.dart';
import '../services/cep_service.dart';

part 'cep_controller.g.dart';

class CepController = CepControllerBase with _$CepController;

abstract class CepControllerBase with Store {
  final CepService _cepService = CepService();

  @observable
  String cep = '';

  @observable
  String resultado = '';

  @observable
  String errorMessage = '';

  @observable
  bool isLoading = false;

  @observable
  List<String> historico = [];

  @action
  void setCep(String value) {
    cep = value;
  }

  @action
  Future<void> buscarEndereco() async {
    if (cep.length != 8) {
      errorMessage = 'CEP inválido. Por favor, insira um CEP válido.';
      return;
    }

    isLoading = true;
    errorMessage = '';

    try {
      final response = await _cepService.buscarCep(cep);
      resultado = response?['logradouro'] ?? 'Endereço não encontrado';

      if (response != null && resultado.isNotEmpty) {
        historico.add(resultado);
        await _cepService.salvarEnderecoLocal(cep, resultado);
      }
    } catch (e) {
      errorMessage = 'Erro ao buscar o endereço. Tente novamente.';
    } finally {
      isLoading = false;
    }
  }

  @action
  Future<void> carregarHistorico() async {
    historico = await _cepService.listarHistorico();
  }
}
