import 'package:flutter/material.dart';
import 'package:map_launcher/map_launcher.dart';

class MapPage extends StatelessWidget {
  final String endereco;  // Endereço ou CEP a ser usado para traçar a rota

  const MapPage({super.key, required this.endereco});

  Future<Coords?> _obterCoordenadas(String endereco) async {
    return Coords(-23.550520, -46.633308);  // Coordenadas de exemplo (São Paulo)
  }

  void _abrirMapa(BuildContext context) async {
    try {
      final coords = await _obterCoordenadas(endereco);
      if (coords == null) {
        if (context.mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Não foi possível obter as coordenadas do endereço.')),
          );
        }
        return;
      }

      final availableMaps = await MapLauncher.installedMaps;

      if (availableMaps.isNotEmpty) {
        await availableMaps.first.showDirections(
          destination: coords,
          destinationTitle: endereco,
        );
      } else {
        if (context.mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Nenhum aplicativo de mapa encontrado')),
          );
        }
      }
    } catch (e) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Erro ao abrir o mapa')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mapa'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () => _abrirMapa(context),
          child: const Text('Abrir Mapa e Traçar Rota'),
        ),
      ),
    );
  }
}
