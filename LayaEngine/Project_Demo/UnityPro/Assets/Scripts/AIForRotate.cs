using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AIForRotate : MonoBehaviour
{
    public Transform AI;
    public Transform TargetTs;

    public float rotateTime;


    // Start is called before the first frame update
    void Start()
    {
        
    }
    private float _logTime;
    void Update()
    {
        Vector3 AIForward = AI.forward;
        Vector3 dir = TargetTs.position - AI.position;
        Quaternion AIRotate =  Quaternion.Slerp(AI.rotation,
        Quaternion.LookRotation(dir, AI.up),
        (1 / rotateTime) * Time.deltaTime
        );
        AI.rotation = AIRotate;
        _logTime+=Time.deltaTime;
        float angle = Vector3.Angle(AIForward,dir);
        if(_logTime>=1 && angle > 0){
            _logTime = 0;
            Debug.Log("AIForward  和  dir 的夹角::"+angle);
        }
        

    }
}
