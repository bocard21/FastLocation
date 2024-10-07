import 'package:flutter/material.dart';

class BuscaCepModal extends StatelessWidget {
  const BuscaCepModal({super.key});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text("Digite o CEP"),
      content: const TextField(
        decoration: InputDecoration(hintText: "CEP"),
        keyboardType: TextInputType.number,
      ),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: const Text("Buscar"),
        ),
      ],
    );
  }
}
