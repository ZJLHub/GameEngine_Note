{
	"version":"LAYASCENE3D:02",
	"data":{
		"type":"Scene3D",
		"props":{
			"name":"TestScene",
			"ambientColor":[
				0.212,
				0.227,
				0.259
			],
			"reflectionDecodingFormat":0,
			"reflection":"Assets/Scenes/TestSceneGIReflection.ltcb",
			"reflectionIntensity":1,
			"ambientMode":1,
			"ambientSphericalHarmonics":[
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0
			],
			"ambientSphericalHarmonicsIntensity":1,
			"lightmaps":[],
			"enableFog":false,
			"fogStart":0,
			"fogRange":300,
			"fogColor":[
				0.5,
				0.5,
				0.5
			]
		},
		"child":[
			{
				"type":"DirectionLight",
				"instanceID":0,
				"props":{
					"name":"Directional Light",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						3,
						0
					],
					"rotation":[
						0.1093816,
						0.8754261,
						0.4082179,
						-0.2345697
					],
					"scale":[
						1,
						1,
						1
					],
					"intensity":1,
					"lightmapBakedType":1,
					"color":[
						1,
						0.9568627,
						0.8392157
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"instanceID":1,
				"props":{
					"name":"player",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						0.28,
						0
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						1,
						0.5,
						1
					],
					"meshPath":"Library/unity default resources-Cube.lm",
					"enableRender":true,
					"materials":[
						{
							"path":"Assets/materials/player.lmat"
						}
					]
				},
				"components":[
					{
						"type":"PhysicsCollider",
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"shapes":[
							{
								"type":"BoxColliderShape",
								"center":[
									0,
									0,
									0
								],
								"size":[
									1,
									1,
									1
								]
							}
						],
						"isTrigger":false
					}
				],
				"child":[
					{
						"type":"MeshSprite3D",
						"instanceID":2,
						"props":{
							"name":"Cylinder",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								0,
								0,
								0.536
							],
							"rotation":[
								-0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								0.5,
								0.1,
								1
							],
							"meshPath":"Library/unity default resources-Cylinder.lm",
							"enableRender":true,
							"materials":[
								{
									"type":"Laya.BlinnPhongMaterial",
									"path":"Resources/unity_builtin_extra.lmat"
								}
							]
						},
						"components":[
							{
								"type":"PhysicsCollider",
								"restitution":0,
								"friction":0.5,
								"rollingFriction":0,
								"shapes":[
									{
										"type":"CapsuleColliderShape",
										"center":[
											5.960464E-08,
											0,
											-8.940697E-08
										],
										"radius":0.5000001,
										"height":2,
										"orientation":1
									}
								],
								"isTrigger":false
							}
						],
						"child":[]
					}
				]
			},
			{
				"type":"MeshSprite3D",
				"instanceID":3,
				"props":{
					"name":"Plane",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						0,
						0
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						10,
						1,
						10
					],
					"meshPath":"Library/unity default resources-Plane.lm",
					"enableRender":true,
					"materials":[
						{
							"path":"Assets/materials/floord.lmat"
						}
					]
				},
				"components":[
					{
						"type":"PhysicsCollider",
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"shapes":[
							{
								"type":"MeshColliderShape",
								"mesh":"Library/unity default resources-Plane.lm"
							}
						],
						"isTrigger":false
					}
				],
				"child":[
					{
						"type":"MeshSprite3D",
						"instanceID":4,
						"props":{
							"name":"Cylinder",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								0,
								0,
								1.06
							],
							"rotation":[
								-0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								0.1,
								0.1,
								1
							],
							"meshPath":"Library/unity default resources-Cylinder.lm",
							"enableRender":true,
							"materials":[
								{
									"path":"Assets/materials/forwardBlue.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":5,
						"props":{
							"name":"Cylinder (1)",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								-0.52,
								0,
								0.19
							],
							"rotation":[
								-0.5,
								0.5,
								-0.5,
								-0.5
							],
							"scale":[
								0.1,
								0.1,
								1
							],
							"meshPath":"Library/unity default resources-Cylinder.lm",
							"enableRender":true,
							"materials":[
								{
									"path":"Assets/materials/RightRed.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					}
				]
			},
			{
				"type":"Camera",
				"instanceID":6,
				"props":{
					"name":"Main Camera",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						13.49,
						-7.88
					],
					"rotation":[
						0,
						0.9070871,
						0.4209431,
						0
					],
					"scale":[
						1,
						1,
						1
					],
					"clearFlag":1,
					"orthographic":false,
					"orthographicVerticalSize":10,
					"fieldOfView":60,
					"enableHDR":true,
					"nearPlane":0.3,
					"farPlane":1000,
					"viewport":[
						0,
						0,
						1,
						1
					],
					"clearColor":[
						0.1921569,
						0.3019608,
						0.4745098,
						0
					]
				},
				"components":[],
				"child":[]
			}
		]
	}
}