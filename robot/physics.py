#
# See the documentation for more details on how this works
#
# The idea here is you provide a simulation object that overrides specific
# pieces of WPILib, and modifies motors/sensors accordingly depending on the
# state of the simulation. An example of this would be measuring a motor
# moving for a set period of time, and then changing a limit switch to turn 
# on after that period of time. This can help you do more complex simulations
# of your robot code without too much extra effort.
#
# NOTE: THIS API IS ALPHA AND WILL MOST LIKELY CHANGE!
#       ... if you have better ideas on how to implement, submit a patch!
#

from pyfrc.physics import drivetrains


class PhysicsEngine(object):
    '''
        Simulates a motor moving something that strikes two limit switches,
        one on each end of the track. Obviously, this is not particularly
        realistic, but it's good enough to illustrate the point
    '''
    
    def __init__(self, physics_controller):
        '''
            :param physics_controller: `pyfrc.physics.core.PhysicsInterface` object
                                       to communicate simulation effects to
        '''
        
        self.physics_controller = physics_controller
        self.physics_controller.add_device_gyro_channel('navxmxp_spi_4_angle')
            
    def update_sim(self, hal_data, now, tm_diff):
        '''
            Called when the simulation parameters for the program need to be
            updated.
            
            :param now: The current time as a float
            :param tm_diff: The amount of time that has passed since the last
                            time that this function was called
        '''
        
        # Simulate the drivetrain
        lf_motor = hal_data['CAN'][4]['value']/-1024
        lr_motor = hal_data['CAN'][5]['value']/-1024
        rf_motor = hal_data['CAN'][2]['value']/-1024
        rr_motor = hal_data['CAN'][3]['value']/-1024
        
        speed, rotation = drivetrains.four_motor_drivetrain(lr_motor, rr_motor, lf_motor, rf_motor, speed=8)
        self.physics_controller.drive(speed, rotation, tm_diff)

