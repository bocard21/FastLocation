import 'package:mobx/mobx.dart';
import 'package:hive/hive.dart';

part 'history_controller.g.dart';

class HistoryController = HistoryControllerBase with _$HistoryController;

abstract class HistoryControllerBase with Store {
  @observable
  List<String> historico = [];

  HistoryControllerBase() {
    carregarHistorico();
  }

  @action
  Future<void> carregarHistorico() async {
    final box = await Hive.openBox<String>('enderecos');
    historico = box.values.toList();
  }

  @action
  Future<void> adicionarHistorico(String endereco) async {
    final box = await Hive.openBox<String>('enderecos');
    await box.add(endereco);
    historico.add(endereco);
  }

  @action
  Future<void> limparHistorico() async {
    final box = await Hive.openBox<String>('enderecos');
    await box.clear();
    historico.clear();
  }
}
