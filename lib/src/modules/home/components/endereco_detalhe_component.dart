import 'package:flutter/material.dart';

@immutable
class EnderecoDetalheComponent extends StatelessWidget {
  final String endereco;

  const EnderecoDetalheComponent({
    super.key,
    required this.endereco,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Text(endereco),
      ),
    );
  }
}
