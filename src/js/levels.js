
namespace("PXTree.AchtzehnKnoten", function (AzK)
{
	AzK.Levels =
			[ { spots:
					[ { x: 50, y: 325, reachable: [1, 2], start:'west' }
					, { x: 105, y: 123, reachable: [3] }
					, { x: 175, y: 486, reachable: [3] }
					, { x: 289, y: 257, reachable: [4, 5] }
					, { x: 408, y: 105, reachable: [5] }
					, { x: 487, y: 337, end:'south' }
					]
				}
			];
});