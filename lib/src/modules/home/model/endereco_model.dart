class EnderecoModel {
  final String logradouro;
  final String bairro;
  final String cidade;
  final String estado;
  final String cep;

  EnderecoModel({
    required this.logradouro,
    required this.bairro,
    required this.cidade,
    required this.estado,
    required this.cep,
  });

  factory EnderecoModel.fromJson(Map<String, dynamic> json) {
    return EnderecoModel(
      logradouro: json['logradouro'] ?? '',
      bairro: json['bairro'] ?? '',
      cidade: json['localidade'] ?? '',
      estado: json['uf'] ?? '',
      cep: json['cep'] ?? '',
    );
  }
}
