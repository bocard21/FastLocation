import 'package:flutter/material.dart';

class EnderecoRecenteComponent extends StatelessWidget {
  final String endereco;

  const EnderecoRecenteComponent({super.key, required this.endereco});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: const Icon(Icons.location_on),
      title: Text(endereco),
    );
  }
}
