// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'cep_controller.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic, no_leading_underscores_for_local_identifiers

mixin _$CepController on CepControllerBase, Store {
  late final _$cepAtom = Atom(name: 'CepControllerBase.cep', context: context);

  @override
  String get cep {
    _$cepAtom.reportRead();
    return super.cep;
  }

  @override
  set cep(String value) {
    _$cepAtom.reportWrite(value, super.cep, () {
      super.cep = value;
    });
  }

  late final _$resultadoAtom =
      Atom(name: 'CepControllerBase.resultado', context: context);

  @override
  String get resultado {
    _$resultadoAtom.reportRead();
    return super.resultado;
  }

  @override
  set resultado(String value) {
    _$resultadoAtom.reportWrite(value, super.resultado, () {
      super.resultado = value;
    });
  }

  late final _$errorMessageAtom =
      Atom(name: 'CepControllerBase.errorMessage', context: context);

  @override
  String get errorMessage {
    _$errorMessageAtom.reportRead();
    return super.errorMessage;
  }

  @override
  set errorMessage(String value) {
    _$errorMessageAtom.reportWrite(value, super.errorMessage, () {
      super.errorMessage = value;
    });
  }

  late final _$isLoadingAtom =
      Atom(name: 'CepControllerBase.isLoading', context: context);

  @override
  bool get isLoading {
    _$isLoadingAtom.reportRead();
    return super.isLoading;
  }

  @override
  set isLoading(bool value) {
    _$isLoadingAtom.reportWrite(value, super.isLoading, () {
      super.isLoading = value;
    });
  }

  late final _$historicoAtom =
      Atom(name: 'CepControllerBase.historico', context: context);

  @override
  List<String> get historico {
    _$historicoAtom.reportRead();
    return super.historico;
  }

  @override
  set historico(List<String> value) {
    _$historicoAtom.reportWrite(value, super.historico, () {
      super.historico = value;
    });
  }

  late final _$buscarEnderecoAsyncAction =
      AsyncAction('CepControllerBase.buscarEndereco', context: context);

  @override
  Future<void> buscarEndereco() {
    return _$buscarEnderecoAsyncAction.run(() => super.buscarEndereco());
  }

  late final _$carregarHistoricoAsyncAction =
      AsyncAction('CepControllerBase.carregarHistorico', context: context);

  @override
  Future<void> carregarHistorico() {
    return _$carregarHistoricoAsyncAction.run(() => super.carregarHistorico());
  }

  late final _$CepControllerBaseActionController =
      ActionController(name: 'CepControllerBase', context: context);

  @override
  void setCep(String value) {
    final _$actionInfo = _$CepControllerBaseActionController.startAction(
        name: 'CepControllerBase.setCep');
    try {
      return super.setCep(value);
    } finally {
      _$CepControllerBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
cep: ${cep},
resultado: ${resultado},
errorMessage: ${errorMessage},
isLoading: ${isLoading},
historico: ${historico}
    ''';
  }
}
