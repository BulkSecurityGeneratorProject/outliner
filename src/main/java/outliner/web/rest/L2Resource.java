package outliner.web.rest;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

import io.github.jhipster.web.util.ResponseUtil;
import outliner.domain.L2;
import outliner.repository.L2Repository;
import outliner.repository.search.L2SearchRepository;
import outliner.web.rest.errors.BadRequestAlertException;
import outliner.web.rest.util.HeaderUtil;

/**
 * REST controller for managing L2.
 */
@RestController
@RequestMapping("/api")
public class L2Resource {



    private final Logger log = LoggerFactory.getLogger(L2Resource.class);

    private static final String ENTITY_NAME = "l2";

    private final L2Repository l2Repository;

    private final L2SearchRepository l2SearchRepository;

    public L2Resource(L2Repository l2Repository, L2SearchRepository l2SearchRepository) {
        this.l2Repository = l2Repository;
        this.l2SearchRepository = l2SearchRepository;
    }

    /**
     * POST  /l-2-s : Create a new l2.
     *
     * @param l2 the l2 to create
     * @return the ResponseEntity with status 201 (Created) and with body the new l2, or with status 400 (Bad Request) if the l2 has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/l-2-s")
    @Timed
    public ResponseEntity<L2> createL2(@Valid @RequestBody L2 l2) throws URISyntaxException {
        log.debug("REST request to save L2 : {}", l2);
        if (l2.getId() != null) {
            throw new BadRequestAlertException("A new l2 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        L2 result = l2Repository.saveAndFlush(l2);
        //EntityManager flush should be called here
        l2SearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/l-2-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /l-2-s : Updates an existing l2.
     *
     * @param l2 the l2 to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated l2,
     * or with status 400 (Bad Request) if the l2 is not valid,
     * or with status 500 (Internal Server Error) if the l2 couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/l-2-s")
    @Timed
    public ResponseEntity<L2> updateL2(@Valid @RequestBody L2 l2) throws URISyntaxException {
        log.debug("REST request to update L2 : {}", l2);
        if (l2.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        L2 result = l2Repository.saveAndFlush(l2);
        //EntityManager flush should be called here
        l2SearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, l2.getId().toString()))
            .body(result);
    }

    /**
     * GET  /l-2-s : get all the l2S.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of l2S in body
     */
    @GetMapping("/l-2-s")
    @Timed
    public List<L2> getAllL2S() {
        log.debug("REST request to get all L2S");
        return (List<L2>) l2Repository.findAll();
    }

    /**
     * GET  /l-2-s/:id : get the "id" l2.
     *
     * @param id the id of the l2 to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the l2, or with status 404 (Not Found)
     */
    @GetMapping("/l-2-s/{id}")
    @Timed
    public ResponseEntity<L2> getL2(@PathVariable Long id) {
        log.debug("REST request to get L2 : {}", id);
        Optional<L2> l2 = l2Repository.findById(id);
        return ResponseUtil.wrapOrNotFound(l2);
    }

    /**
     * DELETE  /l-2-s/:id : delete the "id" l2.
     *
     * @param id the id of the l2 to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/l-2-s/{id}")
    @Timed
    public ResponseEntity<Void> deleteL2(@PathVariable Long id) {
        log.debug("REST request to delete L2 : {}", id);

        l2Repository.deleteById(id);
        l2SearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/l-2-s?query=:query : search for the l2 corresponding
     * to the query.
     *
     * @param query the query of the l2 search
     * @return the result of the search
     */
    @GetMapping("/_search/l-2-s")
    @Timed
    public List<L2> searchL2S(@RequestParam String query) {
        log.debug("REST request to search L2S for query {}", query);
        return StreamSupport
            .stream(l2SearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
