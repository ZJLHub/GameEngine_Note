using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class face_a_to_b : MonoBehaviour
{

    public Transform player;
    public Transform target;
    // Start is called before the first frame update
    void Start()
    {
        Vector3 dir = target.position - player.position;
        Quaternion q = Quaternion.LookRotation(dir,player.up);
        this.player.rotation = q;
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
