import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:fastlocation/src/modules/history/controller/history_controller.dart';

class HistoryPage extends StatelessWidget {
  final HistoryController historyController = HistoryController();

  HistoryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Histórico de Endereços"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            const Text(
              'Histórico de endereços buscados',
              style: TextStyle(fontSize: 20),
            ),
            const SizedBox(height: 20),
            Observer(
              builder: (_) => historyController.historico.isNotEmpty
                  ? Expanded(
                      child: ListView.builder(
                        itemCount: historyController.historico.length,
                        itemBuilder: (context, index) {
                          final endereco = historyController.historico[index];
                          return ListTile(
                            title: Text(endereco),
                          );
                        },
                      ),
                    )
                  : const Text(
                      'Nenhum histórico encontrado',
                      style: TextStyle(fontSize: 16),
                    ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text('Voltar para Home'),
            ),
          ],
        ),
      ),
    );
  }
}
