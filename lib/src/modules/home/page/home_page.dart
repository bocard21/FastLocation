import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:fastlocation/src/modules/home/controller/cep_controller.dart';
import 'package:fastlocation/src/modules/map/page/map_page.dart';

class HomePage extends StatelessWidget {
  final CepController cepController;

  const HomePage({super.key, required this.cepController});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Fast Location")),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              "Digite o CEP para buscar:",
              style: TextStyle(fontSize: 20),
            ),
            SizedBox(
              width: 150,
              child: TextField(
                onChanged: (value) {
                  cepController.setCep(value);
                },
                maxLength: 9,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  labelText: "CEP",
                  counterText: "",
                ),
              ),
            ),
            const SizedBox(height: 20),
            Observer(
              builder: (_) => ElevatedButton(
                onPressed: cepController.isLoading ? null : () async {
                  if (cepController.cep.replaceAll('-', '').length != 8) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Por favor, insira um CEP válido de 8 dígitos.')),
                    );
                    return;
                  }

                  await cepController.buscarEndereco();

                  if (cepController.resultado.isNotEmpty) {
                    if (!context.mounted) return;
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => MapPage(endereco: cepController.resultado),
                      ),
                    );
                  }
                },
                child: cepController.isLoading
                    ? const CircularProgressIndicator(
                        valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                      )
                    : const Text("Localizar Endereço"),
              ),
            ),
            const SizedBox(height: 20),
            const Text(
              "Últimos endereços localizados",
              style: TextStyle(fontSize: 16),
            ),
            Observer(
              builder: (_) => cepController.historico.isNotEmpty
                  ? ListView.builder(
                      shrinkWrap: true,
                      itemCount: cepController.historico.length,
                      itemBuilder: (context, index) {
                        return ListTile(
                          title: Text(cepController.historico[index]),
                        );
                      },
                    )
                  : const Text(
                      "Não há locais recentes",
                      style: TextStyle(fontSize: 14),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
