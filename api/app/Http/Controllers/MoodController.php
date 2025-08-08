<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mood;

class MoodController extends Controller
{
    public function index(Request $request)
    {
        $community = $request->query('community') ?? null;
        $query = Mood::query();

        if ($community) {
            $query->where('community', $community);
        }

        $trends = $query->orderBy('count', 'desc')->paginate(20);

        return response()->json($trends);
    }

    /**
     * Depende del enfoque y qué representa el campo count en tu modelo:
     * Sumarlo: Si count es acumulativo, es decir, que cada nueva captura de tendencias suma más usuarios o menciones al total histórico, entonces sí, debes sumar el nuevo valor al existente.
     * Actualizarlo (reemplazar): Si count representa el valor actual en tiempo real, es decir, la cantidad de cuentas activas o menciones en el momento exacto del crawl, entonces debes actualizar el valor, no sumarlo.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'community' => 'required|string',
            'trend' => 'required|string',
            'count' => 'required|integer',
        ]);

        // Buscar si ya existe un trend para esta comunidad
        $existing = Mood::where('community', $data['community'])
            ->where('trend', $data['trend'])
            ->first();

        if ($existing) {
            // Actualiza el count
            $existing->count = $data['count']; // para reemplazar
            // $existing->count += $data['count']; // para sumar
            $existing->save();
            return response()->json($existing, 200);
        }

        // Si no existe, lo crea
        $trend = Mood::create($data);

        return response()->json($trend, 201);
    }
}
