using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AIForRotate : MonoBehaviour
{
    public Transform AIPlayer;
    public Transform TargetTs;

    public float rotateTime;


    // Start is called before the first frame update
    void Start()
    {

    }
    private float _logTime;
    void Update()
    {
        Vector3 AIForward = AIPlayer.forward;
        Vector3 dir = TargetTs.position - AIPlayer.position;
        Quaternion AIRotate =  Quaternion.Slerp(AIPlayer.rotation,
        Quaternion.LookRotation(dir, AIPlayer.up),//获取当前转向
        (1 / rotateTime) * Time.deltaTime
        );
        AIPlayer.rotation = AIRotate;
        _logTime+=Time.deltaTime;
        float angle = Vector3.Angle(AIForward,dir);
        if(_logTime>=1 && angle > 0){
            _logTime = 0;
            Debug.Log("AIForward  和  dir 的夹角::"+angle);
        }
        // AIPlayer.position += (AIPlayer.forward * Time.deltaTime);

    }
}
