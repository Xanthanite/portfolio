<?php get_header(); ?>
<?php get_sidebar(); ?>
<div class="row text-center justify-content-center sectionOne" id = "sectionOne">
            
            <div class = "col-sm-12 introHolder">
        
            <a class = "display-5 headText" style = "color: rgb(194, 112, 128)">Hi, my name is</a>
                        
            <a class = "display-4 headText text-center" id = "typed"></a>
                    
            <a class = "display-4 headText" id = "subTyped"></a>
            
            </div>
    
        </div>
    
                                                                                    <!-- Section 2 -->
    
        <section class="row text-center sectionTwo" id="sectionTwo">
    
            <div class="col-lg-6 col-md-6 col-sm-3 col-3 outerSection projectDisplay">
                
                <div class="sectionContainer2 text-center">
                    
                    <h1 class="display-5 headingText">Front-End</h1>
    
                </div>
    
            </div>
            
            <div class="col-lg-6 col-md-6 col-sm-3 col-3 outerSection projectDisplay">
    
                <div class="sectionContainer2 text-center">
                
                    <h1 class="display-5 headingText">Back-End</h1>
    
                </div>
    
            </div>
    
        </section>
    
                                                                                    <!-- Section 3 -->
    
        <section class="row text-center sectionThree" id="sectionThree">
    
            <div class="col-lg-4 col-md-4 col-sm-4 col-3 outerSection projectDisplay">
                
                <div class="sectionContainer text-center">
                    
                    <a>1st Column</a>
    
                </div>
    
            </div>
            
            <div class="col-lg-8 col-md-8 col-sm-8 col-7 outerSection projectDisplay">
                
                <div class="site text-center">
                    
                    <div class="overlay">
    
                        <a>I am an overlay</a>
        
                    </div>
                    
                    <a>2nd Column</a>
    
                </div>
    
            </div>
    
        </section>

        <?php if ( have_posts() ) : ?>
<?php while ( have_posts() ) : the_post(); ?>
  <div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <div class="post-header">
       <div class="date"><?php the_time( 'M j y' ); ?></div>
       <h2><a href="<?php the_permalink(); ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>
       <div class="author"><?php the_author(); ?></div>
    </div><!--end post header-->
    <div class="entry clear">
       <?php if ( function_exists( 'add_theme_support' ) ) the_post_thumbnail(); ?>
       <?php the_content(); ?>
       <?php edit_post_link(); ?>
       <?php wp_link_pages(); ?> </div>
    <!--end entry-->
    <div class="post-footer">
       <div class="comments"><?php comments_popup_link( 'Leave a Comment', '1 Comment', '% Comments' ); ?></div>
    </div><!--end post footer-->
    </div><!--end post-->
<?php endwhile; /* rewind or continue if all posts have been fetched */ ?>
    <div class="navigation index">
       <div class="alignleft"><?php next_posts_link( 'Older Entries' ); ?></div>
       <div class="alignright"><?php previous_posts_link( 'Newer Entries' ); ?></div>
    </div><!--end navigation-->
<?php else : ?>
<?php endif; ?>

<?php get footer(); ?>